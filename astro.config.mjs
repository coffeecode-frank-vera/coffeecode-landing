import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://coffeecode.com.mx',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
});
