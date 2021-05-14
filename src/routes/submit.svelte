<script context="module">
  import Modal from "$lib/Modal/index.svelte";
  import ModalBody from "$lib/Modal/ModalBody.svelte";
  import ModalContent from "$lib/Modal/ModalContent.svelte";
  import ModalFooter from "$lib/Modal/ModalFooter.svelte";
  import ModalOverlay from "$lib/Modal/ModalOverlay.svelte";

  export const hydrate = true;
</script>

<script lang="ts">
  let showModal = false;
</script>

<svelte:head>
  <title>Submit | Cheeri-No</title>
</svelte:head>

<div class="content">
  <div class="flex flex-col">
    <h1 class="text-2xl mb-4">Submit a new Company</h1>

    <input type="text" placeholder="Company Name" class="input mb-4" />

    <input
      type="text"
      placeholder="Parent Company"
      class="input"
      readonly
      on:click={() => (showModal = true)}
    />
  </div>

  <Modal open={showModal} on:onClose={() => (showModal = false)}>
    <ModalOverlay />
    <ModalBody>
      <ModalContent>
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
          Select Parent Company
        </h3>
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
