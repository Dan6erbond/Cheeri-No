<script lang="ts">
  import clsx from "clsx";
  import marked from "marked";

  export let value = `
# H1 heading

## H2 heading

### H3 heading

--------

**bold text**

*italicized text*

--------

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

[Svelte](https://svelte.dev/)
`;
  let markdown = marked(value);

  let mode: "view" | "edit" = "edit";
</script>

<div class="my-4">
  <div class="block md:hidden">
    <div class="flex w-full">
      <button
        class={clsx(
          "flex",
          "items-center",
          "justify-center",
          "hover:no-underline",
          "hover:bg-orange-50",
          "transition-colors",
          "p-2",
          "text-sm",
        )}
        class:text-orange-500={mode === "edit"}
        on:click={() => (mode = "edit")}
        type="button"
      >
        {#if mode === "edit"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        {/if}
        <span class="ml-2">Edit</span>
      </button>
      <button
        class={clsx(
          "flex",
          "items-center",
          "justify-center",
          "hover:no-underline",
          "hover:bg-orange-50",
          "transition-colors",
          "p-2",
          "text-sm",
        )}
        class:text-orange-500={mode === "view"}
        on:click={() => (mode = "view")}
        type="button"
      >
        {#if mode === "view"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        {/if}
        <span class="ml-2">Preview</span>
      </button>
    </div>
    <hr class="mb-2" />
  </div>
  <div class="flex w-full mb-8">
    <div
      class={clsx("flex-1", "flex", "flex-col", mode === "edit" ? "block" : "hidden", "md:block")}
    >
      <p class="font-bold mb-2 hidden md:block">Edit</p>
      <textarea
        bind:value
        class={clsx("flex-grow", "border", "input", "text-gray-800", "p-4", "focus:outline-none")}
        rows={value.split("\n").length}
      />
    </div>

    <div class="w-4 hidden md:block" />

    <div class={clsx("flex-1", mode === "view" ? "block" : "hidden", "md:block")}>
      <p class="font-bold mb-2 hidden md:block">Preview</p>
      <div class={clsx("px-4")}>
        {@html markdown}
      </div>
    </div>
  </div>
</div>
