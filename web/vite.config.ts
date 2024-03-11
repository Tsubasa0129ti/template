import { splitVendorChunkPlugin, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from "vite-plugin-checker";

import path from 'path';
import fs from 'fs';
import {glob} from 'glob';

/**
 * 前処理: ビルドの出力結果を削除する。
 */
const output = path.resolve(__dirname, '../src/main/resources');

removeDir(path.resolve(output, 'templates'));
removeDir(path.resolve(output, 'static'));

/** プロジェクトルートを設定。 */
const root = path.resolve(__dirname, 'src');

/**
 * NOTE: searchPathは、src/templatesにするべき。
 * ディレクトリを含めないと、出力先をコントロールできないので、やむを得ず。。。
 */
const searchPath = "src";
const entryFiles = glob.sync("**/*.html", {
  cwd: searchPath
}).map((key) => {
  return [removeExt(key), path.resolve(searchPath, key)];
});

const entryObject = Object.fromEntries(entryFiles);

export default defineConfig(({mode}: any) => {

  /** 開発ビルドかどうか */
  const isDev: boolean = mode === "dev";

  return {
    root: root,
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      isDev ? checker({
        vueTsc: true
      }): undefined,
    ],
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
      rollupOptions: {
        input: entryObject,
        output: {
          entryFileNames: (entryFile) => {
            /**
             * NOTE: templatesディレクトリから一段階外に出している。
             */
            const name = cutFromBeginning(entryFile.name, 'templates/');
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
  }
});

/**
 * 指定したパスのディレクトリを再起的に削除する。
 * 
 * @param path 削除する対象のディレクトリ
 */
async function removeDir(path: string) {
  if(fs.existsSync(path)) {
    await fs.rm(path, {recursive: true}, () => {
      console.log(`Removed the directory ${path} recursively.`);
    });
  }
}

/**
 * 対象の文字列を切り取って返却する。
 * 
 * @param originalString 編集対象の文字列
 * @param targetString 切り取り対象の文字列
 * @returns 編集後の文字列
 */
function cutFromBeginning(originalString: string, targetString: string) {
  return originalString.substring(targetString.length);
}

/** 拡張子を削除する。 */
function removeExt(key: string): string {
  return key.split(".")[0];
}