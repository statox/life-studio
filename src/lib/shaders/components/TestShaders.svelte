<script lang="ts">
    // Copying code to get started with GPGPU
    // https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html

    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import SimpleCounter from './SimpleCounter.svelte';
    import SimpleParticles from './SimpleParticles.svelte';
    import Particles2 from '../Particles2/Particles2.svelte';
    import PositionsBuffer from '../PositionsBuffer/PositionsBuffer.svelte';
    import PositionsTexture from '../PositionsTexture/PositionsTexture.svelte';
    import PositionsTexture2 from '../PositionsTexture2/PositionsTexture.svelte';
    import PositionsTexture3 from '../PositionsTexture3/PositionsTexture.svelte';
    import Test8 from '../Test8/Test8.svelte';
    import Test9 from '../Test9/Test9.svelte';
    import Test10 from '../Test10/Test10.svelte';
    import Test11 from '../Test11/Test11.svelte';
    import Test12 from '../Test12/Test12.svelte';
    import ReglTest from '../ReglTest/Main.svelte';

    const tabs = [
        { title: 'test 1', component: SimpleCounter },
        { title: 'test 2', component: SimpleParticles },
        { title: 'test 3', component: Particles2 },
        { title: 'test 4', component: PositionsBuffer },
        { title: 'test 5', component: PositionsTexture },
        { title: 'test 6', component: PositionsTexture2 },
        { title: 'test 7', component: PositionsTexture3 },
        { title: 'test 8', component: Test8 },
        { title: 'test 9', component: Test9 },
        { title: 'test 10', component: Test10 },
        { title: 'test 11', component: Test11 },
        { title: 'test 12', component: Test12 },
        { title: 'regl', component: ReglTest }
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
            <p>This page is an experiment to run simulation on the GPU.</p>
        </TabPanel>

        {#each tabs as tab}
            <TabPanel>
                <tab.component />
            </TabPanel>
        {/each}
    </Tabs>
</div>
