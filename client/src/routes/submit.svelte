<script context="module">
  import Modal from "$lib/Modal/index.svelte";
  import ModalBody from "$lib/Modal/ModalBody.svelte";
  import ModalContent from "$lib/Modal/ModalContent.svelte";
  import ModalFooter from "$lib/Modal/ModalFooter.svelte";
  import ModalOverlay from "$lib/Modal/ModalOverlay.svelte";
  import "bytemd/dist/index.min.css";
  import clsx from "clsx";

  export const hydrate = true;
</script>

<script lang="ts">
  import ByteMd from "../lib/MarkdownEditor/ByteMD.svelte";

  let companyName: string;
  let parentCompany: string = null;
  let reason: string;
  let source: string;
  let anonymous = true;
  let showModal = false;

  function handleSubmit() {
    console.log(reason);
  }

  function handleChange(e) {
    reason = e.detail.value;
  }
</script>

<svelte:head>
  <title>Submit | Cheeri-No</title>
</svelte:head>

<div class="content">
  <form on:submit|preventDefault={handleSubmit}>
    <h1 class="text-2xl mb-4">Submit a new Company</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <input type="text" placeholder="Company Name" class="input" bind:value={companyName} />

      <div class="input flex items-center">
        <input
          type="text"
          placeholder="Parent Company"
          readonly
          class="focus:outline-none flex-grow"
          on:click={() => (showModal = true)}
        />
        {#if parentCompany}
          <button class="text-gray-400" on:click={() => (parentCompany = null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        {/if}
      </div>
    </div>

    <div class="mb-8">
      <p class="mb-4 font-bold">Reason</p>
      <ByteMd value={reason} on:change={handleChange} />
    </div>

    <p class="mb-4 font-bold">Please provide us with a source.</p>
    <input type="url" placeholder="Source" class="input mb-4 w-full" bind:value={source} />
    <div class="text-gray-600 border-l-2 border-gray-300 pl-2 text-sm flex mb-8 space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        A source allows us to verify the information is accurate and make more informed decisions
        when purchasing from a company.
      </span>
    </div>

    <div class="flex justify-between">
      <label for="anonymous" class="flex items-center space-x-2">
        <input
          type="checkbox"
          id="anonymous"
          class={clsx(
            "h-4",
            "w-4",
            "border",
            "border-gray-300",
            "rounded-lg",
            "checked:bg-orange-500",
            "checked:border-transparent",
            "focus:outline-none",
          )}
          bind:checked={anonymous}
        />
        <span class="text-gray-900 font-medium text-sm">Post Anonymously</span>
      </label>
      <button
        type="submit"
        class={clsx(
          "bg-gradient-to-r",
          "from-red-500",
          "to-yellow-500",
          "hover:ring-2",
          "hover:ring-orange-500",
          "transition-shadow",
          "rounded",
          "px-4",
          "py-2",
          "text-white",
        )}
      >
        Submit
      </button>
    </div>
  </form>

  <Modal bind:open={showModal}>
    <ModalOverlay />
    <ModalBody>
      <ModalContent>
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
          Select Parent Company
        </h3>
        <hr class="my-2 w-full" />
        <div class="mt-2">
          {#each new Array(10) as _, idx (idx)}
            <div class="animate-pulse h-8 bg-gray-200 rounded mb-2" />
          {/each}
        </div>
      </ModalContent>
      <ModalFooter slot="footer">
        <button
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          on:click={() => (showModal = false)}
        >
          Close
        </button>
      </ModalFooter>
    </ModalBody>
  </Modal>
</div>

<style lang="postcss">
  .content {
    @apply w-full max-w-2xl mx-auto mb-0;
  }
</style>
