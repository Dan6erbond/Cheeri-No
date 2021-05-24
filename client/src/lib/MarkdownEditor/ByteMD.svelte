<script lang="ts">
  import gfm from "@bytemd/plugin-gfm";
  import { onMount } from "svelte";

  export let value: string;

  const plugins = [
    gfm(),
    // Add more plugins here
  ];

  let Editor;
  onMount(async () => {
    const module = await import("bytemd");
    Editor = module.Editor;
  });
</script>

<svelte:component
  this={Editor}
  {value}
  on:change
  placeholder="Reason"
  {plugins}
/>
