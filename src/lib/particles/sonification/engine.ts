import { CONFIG, NUM_COLORS, type FeaturesPerColor } from './types';

interface Voice {
    /** Clean oscillators (sine/triangle) — 3 for unison */
    cleanOscs: OscillatorNode[];
    /** Noisy oscillators (sawtooth) — 3 for unison */
    noisyOscs: OscillatorNode[];
    /** Gain for clean oscillator bank */
    cleanGain: GainNode;
    /** Gain for noisy oscillator bank */
    noisyGain: GainNode;
    /** Main voice gain (before LFO modulation) */
    gain: GainNode;
    /** LFO for density-driven pulsing */
    lfo: OscillatorNode;
    lfoGain: GainNode;
    /** Filter for overall brightness */
    filter: BiquadFilterNode;
    /** Stereo placement */
    panner: StereoPannerNode;
}

export class SonificationEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private voices: Voice[] = [];

    start() {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(this.ctx.destination);

        for (let i = 0; i < NUM_COLORS; i++) {
            this.voices.push(this.createVoice(i));
        }
    }

    private createVoice(colorIndex: number): Voice {
        const ctx = this.ctx!;
        const voiceConfig = CONFIG.VOICES[colorIndex];

        // Output chain: panner → master
        const panner = ctx.createStereoPanner();
        panner.pan.value = CONFIG.PAN[colorIndex];
        panner.connect(this.masterGain!);

        // Filter → panner
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = CONFIG.MIN_FILTER_FREQ;
        filter.Q.value = 1;
        filter.connect(panner);

        // LFO modulates gain for density-driven pulsing
        // Chain: gain → filter, with LFO → lfoGain → gain.gain
        const gain = ctx.createGain();
        gain.gain.value = CONFIG.MIN_GAIN;
        gain.connect(filter);

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = CONFIG.LFO_RATES[colorIndex];

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0; // no pulsing initially
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start();

        // Two oscillator banks: clean (sine) and noisy (sawtooth)
        // Both → their own gain node → main gain
        const cleanGain = ctx.createGain();
        cleanGain.gain.value = 1;
        cleanGain.connect(gain);

        const noisyGain = ctx.createGain();
        noisyGain.gain.value = 0;
        noisyGain.connect(gain);

        const baseFreq =
            CONFIG.SCALE[CONFIG.HOME_NOTES[colorIndex]] *
            Math.pow(2, voiceConfig.octaveOffset);

        const cleanOscs: OscillatorNode[] = [];
        const noisyOscs: OscillatorNode[] = [];

        for (let d = -1; d <= 1; d++) {
            const clean = ctx.createOscillator();
            clean.type = colorIndex % 2 === 0 ? 'sine' : 'triangle';
            clean.frequency.value = baseFreq;
            clean.detune.value = d * 3;
            clean.connect(cleanGain);
            clean.start();
            cleanOscs.push(clean);

            const noisy = ctx.createOscillator();
            noisy.type = 'sawtooth';
            noisy.frequency.value = baseFreq;
            noisy.detune.value = d * 15;
            noisy.connect(noisyGain);
            noisy.start();
            noisyOscs.push(noisy);
        }

        return { cleanOscs, noisyOscs, cleanGain, noisyGain, gain, lfo, lfoGain, filter, panner };
    }

    update(features: FeaturesPerColor) {
        if (!this.ctx || this.ctx.state !== 'running') return;

        const now = this.ctx.currentTime;
        const ramp = now + CONFIG.RAMP_TIME_S;

        for (let i = 0; i < NUM_COLORS; i++) {
            const f = features[i];
            const voice = this.voices[i];
            if (!voice) continue;

            const voiceConfig = CONFIG.VOICES[i];
            const octaveMult = Math.pow(2, voiceConfig.octaveOffset);

            // --- Segregation → Pitch ---
            // High segregation: stay on home note
            // Low segregation: drift toward a shared root (average of home notes)
            const homeIdx = CONFIG.HOME_NOTES[i];
            const sharedIdx = 2; // G — center of the scale, consonant with all
            const noteIdx = Math.round(homeIdx + (1 - f.segregation) * (sharedIdx - homeIdx));
            const clampedIdx = Math.max(0, Math.min(CONFIG.SCALE.length - 1, noteIdx));
            const freq = CONFIG.SCALE[clampedIdx] * octaveMult;

            // --- Regularity → Timbre (clean vs noisy blend + detune) ---
            // High regularity = clean, low regularity = noisy
            voice.cleanGain.gain.linearRampToValueAtTime(f.regularity, ramp);
            voice.noisyGain.gain.linearRampToValueAtTime(1 - f.regularity, ramp);

            const detuneAmount = (1 - f.regularity) * CONFIG.MAX_DETUNE_CENTS;

            for (let d = 0; d < 3; d++) {
                const cleanDetune = (d - 1) * 3 * f.regularity;
                voice.cleanOscs[d].frequency.linearRampToValueAtTime(freq, ramp);
                voice.cleanOscs[d].detune.linearRampToValueAtTime(cleanDetune, ramp);

                const noisyDetune = (d - 1) * detuneAmount;
                voice.noisyOscs[d].frequency.linearRampToValueAtTime(freq, ramp);
                voice.noisyOscs[d].detune.linearRampToValueAtTime(noisyDetune, ramp);
            }

            // --- Local Density → Rhythm/Envelope ---
            // High density → pulsing (LFO depth up), short notes
            // Low density → sustained pad (LFO depth 0)
            const lfoDepth =
                CONFIG.LFO_MIN_DEPTH +
                f.localDensity * (CONFIG.LFO_MAX_DEPTH - CONFIG.LFO_MIN_DEPTH);
            voice.lfoGain.gain.linearRampToValueAtTime(lfoDepth * CONFIG.MAX_GAIN, ramp);

            // Gain: slightly louder when dense (more energy in tight clusters)
            const gainVal =
                CONFIG.MIN_GAIN + (0.3 + 0.7 * f.localDensity) * (CONFIG.MAX_GAIN - CONFIG.MIN_GAIN);
            voice.gain.gain.linearRampToValueAtTime(gainVal, ramp);

            // Filter: brighter when irregular (chaotic = more harmonics audible)
            const filterFreq =
                CONFIG.MIN_FILTER_FREQ +
                (1 - f.regularity) * (CONFIG.MAX_FILTER_FREQ - CONFIG.MIN_FILTER_FREQ);
            voice.filter.frequency.linearRampToValueAtTime(filterFreq, ramp);
        }
    }

    setVolume(volume: number) {
        if (!this.masterGain || !this.ctx) return;
        const now = this.ctx.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(
            Math.max(0, Math.min(1, volume)),
            now + 0.05
        );
    }

    stop() {
        if (!this.ctx) return;
        for (const voice of this.voices) {
            for (const osc of [...voice.cleanOscs, ...voice.noisyOscs]) {
                osc.stop();
                osc.disconnect();
            }
            voice.lfo.stop();
            voice.lfo.disconnect();
            voice.lfoGain.disconnect();
            voice.cleanGain.disconnect();
            voice.noisyGain.disconnect();
            voice.gain.disconnect();
            voice.filter.disconnect();
            voice.panner.disconnect();
        }
        this.voices = [];
        this.ctx.close();
        this.ctx = null;
        this.masterGain = null;
    }
}
