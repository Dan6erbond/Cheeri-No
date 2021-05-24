<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import clsx from "clsx";
</script>

<!-- This element is to trick the browser into centering the modal contents. -->
<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203; </span>
<div
  in:fly
  out:fade
  class={clsx(
    "inline-block",
    "align-bottom",
    "bg-white",
    "rounded-lg",
    "text-left",
    "overflow-hidden",
    "shadow-xl",
    "transform",
    "transition-all",
    "sm:my-8",
    "sm:align-middle",
    "w-4/5",
    "sm:max-w-lg",
    "sm:w-full",
  )}
>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div>
      <slot />
    </div>
  </div>
  <slot name="footer" />
</div>
