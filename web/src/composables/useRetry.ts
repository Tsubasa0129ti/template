import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axiosInstance from '../api/repository';
import { useErrorStore } from '@store/error-store';

/**
 * Axiosのリトライ処理を実行する。
 *
 * @returns Axiosのリトライ処理
 */
export default function useRetry() {
  const errorStore = useErrorStore();

  function retryRequest() {
    // NOTE: Retry処理は、Axios実行時のエラーのみのため、型アサーションを実施している。
    const error = errorStore.error as AxiosError<unknown, any>;
    // TODO: エラー回避のため、型アサーションをしている。原因を調査する。
    return axiosInstance.request(error.config as InternalAxiosRequestConfig<any>);
  }

  return { retryRequest };
}
