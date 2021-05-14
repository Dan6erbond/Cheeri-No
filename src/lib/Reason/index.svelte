<script lang="ts">
  import clsx from "clsx";
</script>

<div
  class={clsx(
    "shadow-lg",
    "mb-6",
    "transform",
    "hover:-translate-y-1",
    "transition-transform",
    "rounded-md",
    "overflow-hidden",
  )}
>
  <div class="flex bg-white">
    <div class="flex flex-col flex-grow">
      <div class="p-4">
        <figure>
          <figcaption class="text-sm mb-2">Anonymous, 13.05.2021</figcaption>
          <blockquote class="border-l-2 pl-2 border-gray-100 italic mb-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ducimus nisi,
            voluptas iusto temporibus rerum a optio minima ratione cumque reiciendis numquam id
            modi? Repudiandae earum odit quas totam laborum!
          </blockquote>
        </figure>
      </div>
      <div class="px-4 py-2 bg-gray-50 flex items-center">
        <span>10</span>
        <span class="mx-2">|</span>
        <button class="hover:text-red-400 transition-colors hover:animate-bounce">
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
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </button>
        <span class="mx-2">|</span>
        <button class="hover:text-red-400 transition-colors hover:animate-bounce">
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
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </button>
        <div class="flex-grow" />
        <div class="flex items-center">
          <span class="mr-2"><span class="font-bold">Source:</span> wikipedia.org</span>
          <a href="#" target="_blank" class="text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
              />
              <path
                d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
