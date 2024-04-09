/** コメントを投稿する際のフォームクラス。 */
export default class SampleForm {
  name: string;
  comment: string;

  /**
   * コメントのフォームクラスを生成する。
   *
   * @param name コメントの記入者名
   * @param comment コメントの内容
   */
  constructor(name: string, comment: string) {
    this.name = name;
    this.comment = comment;
  }
}
