import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    vite: {
      optimizeDeps: {
        include: ["lodash", "rehype-sanitize", "lodash.debounce", "unified"],
        exclude: ["rehype-raw"],
      },
    },
  },
};

export default config;
