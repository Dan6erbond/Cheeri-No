<script lang="ts">
  let view: "list" | "card" = "list";
  let sort: "votes" | "new" = "votes";
</script>

<svelte:head>
  <title>Cheeri-No</title>
</svelte:head>

<section>
  <div class="flex w-full mb-4 px-2 py-4">
    <button
      class="flex mr-4"
      on:click={() => (sort = "votes")}
      class:text-orange-400={sort === "votes"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      <span>Votes</span>
    </button>
    <button
      class="flex"
      on:click={() => (sort = "new")}
      class:text-orange-400={sort === "new"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
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
      <span>New</span>
    </button>
    <div class="flex-grow" />
    <button on:click={() => (view = "card")} class="mr-2" class:text-orange-400={view === "card"}>
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
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    </button>
    <button on:click={() => (view = "list")} class:text-orange-400={view === "list"}>
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
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    </button>
  </div>
  {#if view === "list"}
    <div class="flex flex-col -mb-6 justify-items-stretch w-full">
      {#each Array(10) as _, idx (idx)}
        <div
          class="border border-gray-200 mb-6 transform hover:-translate-y-1 transition-transform bg-white rounded-md overflow-hidden"
        >
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
  {:else}
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {#each Array(10) as _, idx (idx)}
        <div
          class="border border-gray-200 transform hover:-translate-y-1 transition-transform bg-white rounded-md overflow-hidden"
        >
          <div class="flex flex-col">
            <div>
              <img
                class="h-36 w-full object-cover"
                src="https://via.placeholder.com/200x150"
                alt=""
              />
            </div>
            <div class="flex flex-col flex-grow">
              <div class="p-6">
                <h3 class="text-xl">Nestlé</h3>
              </div>
              <div class="px-6 py-5 bg-gray-50 flex">
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
  {/if}
</section>
