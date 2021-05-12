<script lang="ts">
  import Header from "$lib/Header/index.svelte";
  import "../app.css";
  import "../app.postcss";
</script>

<Header />

<main>
  <slot />
</main>

<footer />

<style lang="postcss">
  main {
    @apply flex flex-1 flex-col p-4 w-full max-w-5xl my-0 mx-auto box-border;
  }

  footer {
    @apply flex flex-col justify-center items-center p-10;
  }

  @media (min-width: 480px) {
    footer {
      @apply py-10 px-0;
    }
  }
</style>
