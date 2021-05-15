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
        include: [
          "lodash",
          "rehype-sanitize",
          "lodash.debounce",
          "unified",
          "rehype-raw",
          "rehype-stringify",
          "remark-parse",
          "remark-rehype",
          "unist-util-visit",
          "word-count",
          "deepmerge",
          "codemirror-ssr",
          "lodash.throttle",
          "codemirror-ssr/keymap/emacs",
          "codemirror-ssr/mode/gfm/gfm",
          "codemirror-ssr/addon/lint/lint",
          "codemirror-ssr/mode/markdown/markdown",
          "codemirror-ssr/addon/mode/overlay.js",
          "codemirror-ssr/addon/display/placeholder",
          "codemirror-ssr/keymap/vim",
          "codemirror-ssr/mode/xml/xml",
          "codemirror-ssr/mode/yaml/yaml",
          "codemirror-ssr/mode/yaml-frontmatter/yaml-frontmatter",
        ],
      },
    },
  },
};

export default config;
