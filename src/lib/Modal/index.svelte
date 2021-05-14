<script>
  import { setContext } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let open = false;

  setContext("modal", {
    onClose: () => {
      open = false;
      dispatch("onClose");
    },
  });
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  class:hidden={!open}
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  {#if open}
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <slot />
    </div>
  {/if}
</div>
