<script context="module">
  import Reason from "$lib/Reason/index.svelte";
  import clsx from "clsx";

  export const hydrate = true;
</script>

<script lang="ts">
  let sort: "votes" | "new" = "votes";
</script>

<h1 class="text-2xl mb-4">Nestlé</h1>

<p class="text-lg">Reasons</p>

<div class="flex w-full mb-2 px-2 py-4 items-center">
  <button
    class={clsx("flex", "mr-4", sort !== "votes" && "hover:text-gray-500", "transition-colors")}
    on:click={() => (sort = "votes")}
    class:text-orange-400={sort === "votes"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
    <span>Votes</span>
  </button>
  <button
    class={clsx("flex", sort !== "new" && "hover:text-gray-500", "transition-colors")}
    on:click={() => (sort = "new")}
    class:text-orange-400={sort === "new"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>New</span>
  </button>
  <div class="flex-grow" />
  <button
    class="flex items-center hover:no-underline hover:bg-orange-50 transition-colors p-2 rounded"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    <span class="mr-2 hidden md:inline">Add a Reason</span>
  </button>
</div>

<div class="flex flex-col -mb-6">
  {#each Array(10) as _, idx (idx)}
    <Reason />
  {/each}
</div>
