import { splitVendorChunkPlugin, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';

const root = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  root: root,
  plugins: [vue(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      // import '/@component/sample.vue'からモジュールを使用可能にする。
      '/@component/': path.join(__dirname, 'src/main/vue/component'),
    }
  },
  server: {
    host: true, // dockerなどの仮想から外に出すため（ポートを開けるという意味かな？）
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: '../../src/main/resources/',
    // emptyOutDir: true,
    rollupOptions: {
      input: {
        'templates/index': path.resolve(__dirname, 'src/templates/index.html'),
        'templates/db_sample.html': path.resolve(__dirname, 'src/templates/db_sample.html')
      },
      output: {
        entryFileNames: (entryFile) => {
          /**
           * NOTE: templatesディレクトリから一段階外に出している。かなり無理やり実装しているので、今後修正する。
           */
          let name = entryFile.name.replace('templates/', '');
          return `static/js/${name}.js`;
        },
        chunkFileNames: `static/vendor/[hash].js`,
        assetFileNames: (asset) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(asset.name!)) {
            return 'static/assets/[name].[ext]';
          }
          if (/\.css$/.test(asset.name!)) {
            return `static/css/[name].css`;
          }
          return 'static/assets/[name].[ext]';
        }
      },
    }
  }
})
