<script lang="ts">
  import { page } from "$app/stores";
</script>

<div
  class="flex bg-white border-t border-gray-300 left-0 bottom-0 right-0 fixed p-4 transition-transform transform md:translate-y-56 justify-center"
>
  <a
    href="/submit"
    class="flex items-center justify-center hover:no-underline hover:bg-orange-50 transition-colors p-2 rounded-full"
    class:text-orange-400={$page.path === "/submit"}
  >
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </a>
</div>
