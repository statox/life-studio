<script lang="ts">
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import About from './components/About.svelte';
    import Auto from './components/Auto.svelte';
    import Manual from './components/Manual.svelte';
    import ParametersMap from '../parametersMap/Main.svelte';
    import Archive from './components/Archive.svelte';
</script>

<div>
    <Tabs>
        <TabList>
            <Tab>About</Tab>
            <Tab>Manual</Tab>
            <Tab>Auto</Tab>
            <Tab>Parameters map</Tab>
            <Tab>Previous versions</Tab>
        </TabList>

        <TabPanel>
            <About />
        </TabPanel>
        <TabPanel>
            <Manual />
        </TabPanel>
        <TabPanel>
            <Auto />
        </TabPanel>
        <TabPanel>
            <ParametersMap />
        </TabPanel>
        <TabPanel>
            <Archive />
        </TabPanel>
    </Tabs>
</div>
