<script lang="ts">
  import clsx from "clsx";
</script>

<footer
  class={clsx(
    "flex",
    "flex-col",
    "text-white",
    "border-t",
    "bg-gradient-to-r",
    "from-red-500",
    "to-yellow-500",
    "p-4",
    "transition-transform",
    "transform",
    "md:translate-y-56",
    "items-center",
    "pb-20",
    "md:pb-4",
  )}
>
  <span class="mb-2">Built with ❤ by RaviAnand Mohabir</span>
  <a href="/about" class="mb-2">About</a>
  <a href="/donate" class="mb-2">Donate</a>
</footer>
