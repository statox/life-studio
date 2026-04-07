<script lang="ts">
    import type { AttractionTable } from '$lib/particles/attraction';
    import { COLORS } from '../engine';

    interface Props {
        attractionTable: AttractionTable;
        onclose?: () => void;
    }

    let { attractionTable, onclose }: Props = $props();

    let name = $state('');
    let description = $state('');
    let copied = $state(false);

    let code = $derived(
        (() => {
            const rows = COLORS.map((from) => {
                const vals = COLORS.map((to) => `${to}: ${attractionTable[from][to]}`).join(', ');
                return `            ${from}: { ${vals} }`;
            }).join(',\n');
            const safeName = name.replace(/'/g, "\\'");
            const safeDesc = description.replace(/'/g, "\\'");
            return `    {\n        name: '${safeName}',\n        description: '${safeDesc}',\n        table: {\n${rows}\n        }\n    },`;
        })()
    );

    const copy = () => {
        navigator.clipboard.writeText(code).then(() => {
            copied = true;
            setTimeout(() => (copied = false), 2000);
        });
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={(e) => e.target === e.currentTarget && onclose?.()}>
    <div class="modal">
        <div class="modal-header">
            <span class="title">Export attraction table</span>
            <button class="icon-btn" onclick={() => onclose?.()}>✕</button>
        </div>

        <div class="field">
            <label for="export-name">Name</label>
            <input id="export-name" type="text" placeholder="My table" bind:value={name} />
        </div>
        <div class="field">
            <label for="export-desc">Description</label>
            <input
                id="export-desc"
                type="text"
                placeholder="What does it do?"
                bind:value={description}
            />
        </div>

        <div class="code-block">
            <pre>{code}</pre>
        </div>

        <button class="copy-btn" class:copied onclick={copy}>
            {copied ? '✓ Copied!' : '⧉ Copy to clipboard'}
        </button>

        <p class="notice">
            Paste the copied code into the <code>tables</code> array in
            <a
                href="https://github.com/statox/particles-life/blob/main/src/lib/particles/attraction/tables.ts"
                target="_blank"
                rel="noopener noreferrer"><code>src/lib/particles/attraction/tables.ts</code></a
            >.
        </p>
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
        transition:
            background 0.13s,
            border-color 0.13s;
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
        transition:
            background 0.13s,
            border-color 0.13s;
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

    .notice {
        margin: 0;
        font-size: 0.75rem;
        color: #546e7a;
        line-height: 1.5;
    }

    .notice code {
        font-family: 'Fira Mono', 'Consolas', monospace;
        color: #78909c;
    }

    .notice a {
        color: #78909c;
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .notice a:hover {
        color: #90a4ae;
    }
</style>
