import path from 'path';
import {glob} from 'glob';
import {splitVendorChunkPlugin, defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// rootディレクトリのパス
const root = path.resolve(__dirname, 'src/main');

// エントリーポイントの対象ファイル群を取得する。
const tsSearchPath = "src/main/vue/pages";
const entryTsFiles = glob.sync("**/*.ts", {
  cwd: tsSearchPath
}).map((key) => {
  return [removeExt(key), path.resolve(tsSearchPath, key)];
});

const scssSearchPath = "src/main/scss";
const entryScssFiles = glob.sync("**/*.scss", {
  cwd: scssSearchPath,
  ignore: "**/_*.scss"
}).map((key) => {
  return [key, path.resolve(scssSearchPath, key)]
});

const entryFiles = [...entryTsFiles, ...entryScssFiles];
const entryObject = Object.fromEntries(entryFiles);

export default defineConfig({
  root: root, // エントリーポイントのindex.htmlが存在するディレクトリを指定する。（デフォルトでは、プロジェクトルート）
  plugins: [vue(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      // import '/@component/sample.vue'からモジュールを使用可能にする。
      '/@component/': path.join(__dirname, 'src/main/vue/component'),
    }
  },
  envDir: './src/main', // .envファイルを配置するディレクトリ（Docker用の.envを勝手に読み込まないようにすべきかな）
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: './resources/static',
    emptyOutDir: true,
    rollupOptions: {
      input: entryObject,
      output: {
        entryFileNames: `js/[name].js`,
        chunkFileNames: `vendor/[hash].js`,
        assetFileNames: (asset) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(asset.name!)) {
            return 'assets/images/[name].[ext]';
          }
          if (/\.css$/.test(asset.name!)) {
            console.log(asset.name);
            return `css/[name].css`;
          }
          return 'assets/public/[name].[ext]';
        }
      },
    }
  }
});

// 拡張子を削除する。
function removeExt(key: string): string {
  return key.split(".")[0];
}