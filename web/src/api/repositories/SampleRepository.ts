import { AxiosPromise } from 'axios';
import repository from '../repository';
import { SampleDto } from '../../store/samples/SampleDto';

const resources = '/sample';

/**
 * サンプルドメインを操作するためのリポジトリクラス。
 */
export default class SampleRepository {
  /**
   * サンプルテーブルを全件取得する。
   *
   * @returns サンプルデータのリスト
   */
  public getAll(): AxiosPromise<SampleDto[]> {
    return repository.get(`${resources}`);
  }

  /**
   * サンプルテーブルへの追加処理を実施する。
   *
   * @param samples 新規追加するサンプル情報
   * @returns 非同期のアクションの結果。
   */
  public addSample(samples: SampleDto): AxiosPromise<void> {
    return repository.post(`${resources}`, samples);
  }

  /**
   * コメントの記入者名が検索文字列に部分一致するサンプル情報を取得する。
   *
   * @param param 検索文字列
   * @returns 検索文字列に部分一致するサンプル情報
   */
  public filterByUserName(param: string): AxiosPromise<SampleDto[]> {
    return repository.get(`${resources}/filter`, {
      params: {
        param: param
      }
    });
  }
}
