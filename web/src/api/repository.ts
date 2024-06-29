import axios, { AxiosResponse } from 'axios';
import router from '../router/index';
import { useErrorStore } from '../store/error-store';
import { InternalServerError, NetWorkError, UnprocessableEntity } from '../utils/custom-error';

const baseDomain = import.meta.env.VITE_API_BASE_URL;
const baseURL = `${baseDomain}/api`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  // TODO: エラー回避のため、型を指定していない。AxiosErrorを設定できないかを検討する。
  (error) => {
    /**
     * NOTE: サーバーからのエラーのレスポンスがある場合のハンドリング。
     */
    if (error.response) {
      switch (error.response.status) {
        //認証エラー
        case 401:
          window.alert('セッションが期限切れです。再度ログインしてください。');
          router.push('/login');
          break;
        // アクセス拒否
        case 403:
          router.push({
            path: '/error',
            state: { message: error.response.data.message, statusCode: error.response.status }
          });
          break;
        // バリデーションエラー
        case 422:
          return Promise.reject(new UnprocessableEntity(error));
        /** NOTE: ステータスコード500, 503を捕捉する。 */
        default:
          throw new InternalServerError(error);
      }
    }

    /**
     * NOTE: サーバーダウンなどの原因により、レスポンスがない場合のハンドリング。
     */
    if (error.request) {
      const errorStore = useErrorStore();
      errorStore.updateErrorState({
        error: error,
        message: 'ネットワークのエラーが発生しました。リトライしますか？',
        retry: true
      });

      throw new NetWorkError(error);
    }

    /**
     * NOTE: リクエストに失敗した場合は、Promiseのrejectとして扱われる。
     * この場合には、Errorオブジェクトが返される。
     */
    if (error.message) {
      router.push({ path: '/error', state: { message: error.message } });
    }
  }
);

export default axiosInstance;
