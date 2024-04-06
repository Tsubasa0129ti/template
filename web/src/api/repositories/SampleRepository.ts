//import { AxiosPromise } from 'axios';
import repository from '../repository';

const resources = '/sample';

/**
 * サンプルドメインを操作するためのリポジトリクラス。
 */
export default class SampleRepository {
  /**
   * サンプルテーブルを全件取得する。
   */
  public getAll() {
    console.log(repository.get(`${resources}`));
  }
}
