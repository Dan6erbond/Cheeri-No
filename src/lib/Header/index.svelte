<script lang="ts">
  import { page } from "$app/stores";
  import clsx from "clsx";
  import logo from "./logo.svg";
</script>

<header
  class="p-4 px-4 md:px-8 lg:px-12 flex items-center justify-center border-b border-gray-300 bg-white fixed top-0 right-0 left-0 z-10"
>
  <div class="flex items-center justify-center">
    <a href="/">
      <img src={logo} alt="SvelteKit" class="w-28" />
    </a>
  </div>

  <div class="flex-grow" />

  <nav class="hidden justify-center md:flex space-x-4">
    <a
      href="/submit"
      class="flex items-center hover:no-underline hover:bg-orange-50 transition-colors p-2 rounded space-x-2"
      class:bg-orange-50={$page.path === "/submit"}
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
      <span class="mr-2">Submit a Company</span>
    </a>
    <a
      href="/history"
      class="flex items-center hover:no-underline hover:bg-orange-50 transition-colors p-2 rounded space-x-2"
      class:bg-orange-50={$page.path === "/history"}
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="mr-2">History</span>
    </a>
  </nav>

  <div class="flex-grow" />

  <div class="flex items-center justify-center">
    {#if false}
      <a
        href="/profile"
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
        {#if $page.path === "/profile"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        {/if}
      </a>
    {:else}
      <a
        href="/login"
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
        class:text-orange-500={$page.path === "/login"}
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
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </a>
    {/if}
  </div>
</header>
