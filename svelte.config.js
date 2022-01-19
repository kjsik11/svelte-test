import path from 'path';

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({ postcss: true }),

  kit: {
    vite: {
      resolve: {
        alias: {
          $utils: path.resolve('src/utils'),
          $components: path.resolve('src/components'),
          $types: path.resolve('src/types'),
        },
      },
    },

    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#__app_root',
  },
};

export default config;
