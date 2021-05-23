<script lang="ts">
  import BottomNav from "$lib/BottomNav/index.svelte";
  import Footer from "$lib/Footer/index.svelte";
  import Header from "$lib/Header/index.svelte";
  import "../app.css";
  import "../app.postcss";
</script>

<Header />

<main>
  <slot />
</main>

<Footer />

<BottomNav />

<style lang="postcss">
  main {
    @apply flex flex-1 flex-col p-4 w-full max-w-5xl my-0 mx-auto box-border mt-20;
  }
</style>
