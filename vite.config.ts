import { fileURLToPath } from 'url';
// import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
    }),
    svgLoader(),
  ],

  server: {
    port: 3002,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://127.0.0.1:3000/',
    },
  },
});
