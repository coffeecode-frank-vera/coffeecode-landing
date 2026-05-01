import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://coffeecode-frank-vera.github.io',
  base: '/coffeecode-landing',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
});
