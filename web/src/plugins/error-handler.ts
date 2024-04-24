import { App, ref } from 'vue';
import { InternalServerError, NetWorkError } from '../utils/custom-error';
import router from '../router/index';

export const errorState = ref({
  message: '',
  canRetry: false
});

const ErrorHandlerPlugin = {
  install(app: App<Element>) {
    /**
     * アプリケーション内から伝播する未捕捉のエラーをに対して、グローバルハンドラーを割り当てる。
     *
     * @param err エラー
     */
    app.config.errorHandler = (err: unknown) => {
      handler(err);
    };

    /**
     * Vue.js以外のエラー
     */
    window.addEventListener('error', (event) => {
      handler(event.error);
    });

    /**
     * Promise経由で呼び出されるエラー
     */
    window.addEventListener('unhandledrejection', (event) => {
      handler(event.reason);
    });
  }
};

const handler = (error: unknown) => {
  if (error instanceof InternalServerError) {
    errorState.value.message = error.message;
  } else if (error instanceof NetWorkError) {
    // 画面上への描画とリトライボタンを表示する。
    errorState.value.message = error.message;
    errorState.value.canRetry = true;
  } else if (error instanceof Error) {
    router.push({ path: '/error', state: { message: error.message } });
  }
};

export { ErrorHandlerPlugin };
