<script lang="ts">
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  const { onClose } = getContext("modal");
</script>

<div
  in:fade
  out:fade
  on:click={onClose}
  class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
  aria-hidden="true"
/>
