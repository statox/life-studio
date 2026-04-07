<script lang="ts">
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import V1 from '../../v1/Main.svelte';
    import V2 from '../../v2/Main.svelte';
    import V3 from '../../v3/Main.svelte';
    import V4 from '../../v4/Main.svelte';
    import V5 from '../../v5/Main.svelte';
    import V6 from '../../v6/Main.svelte';
    import V7 from '../../v7/Main.svelte';
    import ParametersMap from '../../parametersMap/Main.svelte';
    import AutoVisualizer from '../../autoVisualizer/Main.svelte';

    const tabs = [
        { title: 'Auto visualizer', component: AutoVisualizer },
        { title: 'V7', component: V7 },
        { title: 'Parameters map', component: ParametersMap },
        { title: 'V6', component: V6 },
        { title: 'V5', component: V5 },
        { title: 'V4', component: V4 },
        { title: 'V3', component: V3 },
        { title: 'V2', component: V2 },
        { title: 'V1', component: V1 }
    ];
</script>

<p>
    Here is a list of the various iterations I have made before I got the final version of this
    project.
</p>

<div class="warning">
    <p>
        Some of the previous versions have a bug and the code is not cleaned up properly when the
        page unload. Which make that when navigating between different versions it is possible to
        end up in a state where several simulation are running in parallel.
    </p>
    <p>
        To avoid this kind of issues make sure the refresh the page each time you select a new
        version
    </p>
</div>

<div>
    <Tabs>
        <TabList>
            {#each tabs as tab}
                <Tab>{tab.title}</Tab>
            {/each}
        </TabList>

        {#each tabs as tab}
            <TabPanel>
                <tab.component />
            </TabPanel>
        {/each}
    </Tabs>
</div>
