import axios, { AxiosResponse } from 'axios';
import router from '../router/index';

const baseDomain = import.meta.env.VITE_API_BASE_URL;
const baseURL = `${baseDomain}/api`;

// axios instanceの詳細については、以下を参照。
// https://axios-http.com/docs/instance
const axiosInstance = axios.create({
  baseURL
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
        // TODO: アクセス拒否についてのハンドリングを記載する。
        case 403:
          break;
        // TODO: リソースが存在しない場合のハンドリングを記載する。
        case 404:
          break;
        /** NOTE: ステータスコード422, 500を捕捉する。 */
        default:
          return Promise.reject(error);
      }
    }

    /**
     * NOTE: サーバーダウンなどの原因により、レスポンスがない場合のハンドリング。
     */
    if (error.request) {
      const networkError: Error = new Error(
        'ネットワークエラーが発生しました。しばらくしてから再度お試しください。'
      );
      // TODO: ユーザー側から自発的に解決ができる様な操作のボタンやリンクを提供する。
      return Promise.reject(networkError);
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
