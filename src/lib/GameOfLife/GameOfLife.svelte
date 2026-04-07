<script lang="ts">
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import V1 from './v1/Main.svelte';
    import V2 from './v2/Main.svelte';
    import V3 from './v3/Main.svelte';
    import V4 from './v4/Main.svelte';
    import V5 from './v5/Main.svelte';
    import V6 from './v6/Main.svelte';

    const tabs = [
        { title: 'V6', component: V6 },
        { title: 'V5', component: V5 },
        { title: 'V4', component: V4 },
        { title: 'V3', component: V3 },
        { title: 'V2', component: V2 },
        { title: 'V1', component: V1 }
    ];
</script>

<div>
    <Tabs>
        <TabList>
            <Tab>About</Tab>
            {#each tabs as tab}
                <Tab>{tab.title}</Tab>
            {/each}
        </TabList>

        <TabPanel>
            <p>Experiments running Conway's Game of Life in WebGL shaders.</p>
            <p>
                List of patterns available <a
                    target="none"
                    href="https://conwaylife.com/wiki/Category:Patterns"
                >
                    in the wiki
                </a>
            </p></TabPanel
        >

        {#each tabs as tab}
            <TabPanel>
                <tab.component />
            </TabPanel>
        {/each}
    </Tabs>
</div>
