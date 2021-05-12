<script context="module" lang="ts">
  export const prerender = true;
</script>

<svelte:head>
  <title>Cheeri-No</title>
</svelte:head>

<section>
  <div class="flex flex-col -mb-6 justify-items-stretch w-full">
    {#each Array(10) as _, idx (idx)}
      <div class="shadow mb-6 hover:shadow-md transition-shadow">
        <div class="flex">
          <div>
            <img
              class="w-40 h-full object-cover"
              src="https://via.placeholder.com/200x150"
              alt=""
            />
          </div>
          <div class="flex flex-col flex-grow">
            <div class="p-10">
              <h3 class="text-xl">Nestlé</h3>
            </div>
            <div class="px-10 py-5 bg-gray-50 flex">
              <div class="flex items-center">
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
              </div>
              <div class="flex-grow" />
              <a href="/companies/id" class="flex items-center">
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
    {/each}
  </div>
</section>

<style style lang="postcss">
  section {
    @apply flex flex-col justify-center items-center flex-1;
  }
</style>
