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
      <div class="p-5 md:p-10">
        <h3 class="text-xl md:mb-4">Nestlé</h3>
        <div class="text-gray-400 text-sm hidden md:block">
          <p class="font-bold mb-2">Top reason:</p>
          <figure>
            <blockquote class="border-l-2 pl-2 border-gray-100 italic mb-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ducimus nisi,
              voluptas iusto temporibus rerum a optio minima ratione cumque reiciendis numquam id
              modi? Repudiandae earum odit quas totam laborum!
            </blockquote>
            <figcaption>Anonymous, 13.05.2021</figcaption>
          </figure>
        </div>
        <p class="mt-2 text-sm"><b>Total Reasons:</b> 10</p>
      </div>
      <div class="px-5 md:px-10 py-2 md:py-5 bg-gray-50 flex">
        <div class="flex-grow" />
        <a href="/companies/id" class="flex items-center text-sm md:text-base">
          <span>View</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
