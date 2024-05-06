import axiosInstance from '../api/repository';
import { useStore } from 'vuex';

/**
 * Axiosのリトライ処理を実行する。
 *
 * @returns Axiosのリトライ処理
 */
export default function useRetry() {
  const store = useStore();

  function retryRequest() {
    const error = store.state.errorState.error;
    return axiosInstance.request(error.config);
  }

  return { retryRequest };
}
