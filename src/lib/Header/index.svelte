<script lang="ts">
  import { page } from "$app/stores";
  import logo from "./logo.svg";
</script>

<header>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <nav>{$page.path}</nav>

  <div class="corner">
    <a href="https://github.com/Dan6erbond/Cheeri-No">GitHub</a>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  .corner {
    width: 9em;
    height: 4em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .corner img {
    width: 7em;
    height: 4em;
    object-fit: contain;
  }

  nav {
    display: flex;
    justify-content: center;
    --background: rgba(255, 255, 255, 0.7);
  }

  a:hover {
    color: var(--accent-color);
  }
</style>
