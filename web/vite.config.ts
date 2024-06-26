import { splitVendorChunkPlugin, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

/** プロジェクトルートを設定。 */
const root = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  /** 開発ビルドかどうか */
  const isDev: boolean = mode === 'dev';

  return {
    root: root,
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      tsconfigPaths(),
      isDev
        ? checker({
            vueTsc: true
          })
        : undefined
    ],
    resolve: {
      alias: {
        '@components': path.join(__dirname, 'src/pages/components'),
        '@store': path.join(__dirname, 'src/store'),
        '@composables': path.join(__dirname, 'src/composables')
      }
    },
    server: {
      strictPort: true,
      watch: {
        usePolling: true
      }
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `static/js/[name].js`,
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
        }
      }
    }
  };
});
