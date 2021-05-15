<script lang="ts">
  import { page } from "$app/stores";
  import clsx from "clsx";
</script>

<div
  class={clsx(
    "flex",
    "bg-white",
    "border-t",
    "border-gray-300",
    "left-0",
    "bottom-0",
    "right-0",
    "fixed",
    "p-2",
    "transition-transform",
    "transform md:translate-y-56",
    "justify-center",
  )}
>
  <a
    href="/submit"
    class={clsx(
      "flex",
      "items-center",
      "justify-center",
      "hover:no-underline",
      "hover:bg-orange-50",
      "transition-colors",
      "p-2",
      "rounded-full",
    )}
  >
    {#if $page.path === "/submit"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clip-rule="evenodd"
        />
      </svg>
    {:else}
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
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    {/if}
  </a>
</div>
