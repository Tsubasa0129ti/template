import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';

const root = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  root: root,
  plugins: [vue()],
  build: {
    outDir: '../../src/main/resources/',
    assetsDir: 'static',
    rollupOptions: {
      input: {
        'templates/index': path.resolve(__dirname, 'src/templates/index.html')
      }
    }
  }
})
