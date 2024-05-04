import axios, { AxiosResponse } from 'axios';
import router from '../router/index';
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
  (error) => {
    console.log('interceptors');
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
      if (window.confirm('ネットワークのエラーが発生しました。リトライしますか？')) {
        return axiosInstance.request(error.config);
      }

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
