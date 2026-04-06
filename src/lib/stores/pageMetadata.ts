import { writable } from 'svelte/store';

export const pageMetadataStore = writable<{ name: string }>({
    name: ''
});
