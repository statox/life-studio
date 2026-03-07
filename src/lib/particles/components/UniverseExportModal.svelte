<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Universe } from '../universe';

    export let universe: Universe;

    const dispatch = createEventDispatcher<{ close: void }>();

    let name = '';
    let description = '';
    let copied = false;

    $: result = (() => {
        try {
            return JSON.stringify({ name, description, ...universe }, null, 2);
        } catch {
            return 'Error';
        }
    })();

    const copy = () => {
        navigator.clipboard.writeText(result).then(() => {
            copied = true;
            setTimeout(() => (copied = false), 2000);
        });
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div class="backdrop" on:click|self={() => dispatch('close')}>
    <div class="modal">
        <div class="modal-header">
            <span class="title">Export Universe</span>
            <button class="icon-btn" on:click={() => dispatch('close')}>✕</button>
        </div>

        <div class="field">
            <label for="export-name">Name</label>
            <input id="export-name" type="text" placeholder="My table" bind:value={name} />
        </div>
        <div class="field">
            <label for="export-desc">Description</label>
            <textarea
                rows="4"
                id="export-desc"
                placeholder="What does it do?"
                bind:value={description}
            />
        </div>

        <div class="code-block">
            <pre>{result}</pre>
        </div>

        <button class="copy-btn" class:copied on:click={copy}>
            {copied ? '✓ Copied!' : '⧉ Copy to clipboard'}
        </button>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }

    .modal {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 10px;
        padding: 20px 24px;
        width: min(560px, 92vw);
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 95vh;
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #78909c;
        font-weight: 600;
    }

    .field {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .field label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 60px;
        flex-shrink: 0;
    }

    .field input {
        flex: 1;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 5px 8px;
        font-size: 0.82rem;
    }

    .field textarea {
        flex: 1;
    }

    .field input:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    .code-block {
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 6px;
        padding: 12px 14px;
        overflow-x: auto;
    }

    .code-block pre {
        margin: 0;
        font-family: 'Fira Mono', 'Consolas', monospace;
        font-size: 0.78rem;
        color: #c3e88d;
        white-space: pre;
        line-height: 1.5;
    }

    .icon-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 5px 9px;
        font-size: 0.88rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
    }

    .icon-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .copy-btn {
        align-self: flex-end;
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 14px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
    }

    .copy-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .copy-btn.copied {
        border-color: #c3e88d55;
        color: #c3e88d;
    }
</style>
