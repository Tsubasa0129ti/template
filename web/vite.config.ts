import { splitVendorChunkPlugin, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';
import {glob} from 'glob';

const root = path.resolve(__dirname, 'src');

/**
 * NOTE: searchPathは、src/templatesにするべき。
 * ディレクトリを含めないと、出力先をコントロールできないので、やむを得ず。。。
 */
const searchPath = "src";
const entryFiles = glob.sync("**/*.html", {
  cwd: searchPath
}).map((key) => {
  return [key, path.resolve(searchPath, key)];
});

const entryObject = Object.fromEntries(entryFiles);

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
    outDir: '../../src/main/resources/', // 本当は、出力先をtemplatesまでをここで指定したい。
    /**
     * NOTE: 本来は設定するべきだが、application.propertiesまで削除されてしまうため、無効にしている。
     */
    // emptyOutDir: true,
    rollupOptions: {
      input: entryObject,
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
