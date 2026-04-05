import { FeatureExtractor } from './extractor';
import { SonificationEngine } from './engine';
import { CONFIG, NUM_COLORS, type FeaturesPerColor, type ColorFeatures } from './types';

export class SonificationController {
    private extractor = new FeatureExtractor();
    private engine = new SonificationEngine();
    private _running = false;
    private lastSampleTime = 0;
    private smoothedFeatures: FeaturesPerColor | null = null;

    get running() {
        return this._running;
    }

    start() {
        if (this._running) return;
        this.extractor.reset();
        this.engine.start();
        this._running = true;
        this.lastSampleTime = 0;
        this.smoothedFeatures = null;
    }

    stop() {
        if (!this._running) return;
        this.engine.stop();
        this._running = false;
    }

    /**
     * Feed particle data from the simulation loop.
     * Internally throttled to CONFIG.SAMPLE_INTERVAL_MS (~300ms).
     *
     * positions: interleaved [x0, y0, x1, y1, ...] in world coordinates
     * colors: color index (0-3) per particle
     * n: number of particles
     * worldSize: {x, y} world dimensions
     */
    feed(
        positions: Float32Array,
        colors: Uint8Array,
        n: number,
        worldSize: { x: number; y: number }
    ) {
        if (!this._running) return;

        const now = performance.now();
        if (now - this.lastSampleTime < CONFIG.SAMPLE_INTERVAL_MS) return;
        this.lastSampleTime = now;

        const raw = this.extractor.extract(positions, colors, n, worldSize.x, worldSize.y);
        const features = this.smooth(raw);
        this.engine.update(features);
    }

    setVolume(volume: number) {
        this.engine.setVolume(volume);
    }

    private smooth(raw: FeaturesPerColor): FeaturesPerColor {
        if (!this.smoothedFeatures) {
            this.smoothedFeatures = raw.map((f) => ({ ...f })) as FeaturesPerColor;
            return this.smoothedFeatures;
        }

        const a = CONFIG.SMOOTHING_FACTOR;
        for (let i = 0; i < NUM_COLORS; i++) {
            const s = this.smoothedFeatures[i];
            const r = raw[i];
            s.segregation = s.segregation * a + r.segregation * (1 - a);
            s.localDensity = s.localDensity * a + r.localDensity * (1 - a);
            s.regularity = s.regularity * a + r.regularity * (1 - a);
        }

        return this.smoothedFeatures;
    }
}
