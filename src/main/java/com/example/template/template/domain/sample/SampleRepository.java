package com.example.template.template.domain.sample;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * サンプル情報とのやり取りを行うリポジトリークラスのインタフェース。
 */
@Repository
public interface SampleRepository extends JpaRepository<Samples, String> {

  /**
   * コメントの記入者名が検索文字列に部分一致するサンプル情報を取得する。
   *
   * @param param 検索文字列
   * @return 検索文字列に部分一致するサンプル情報
   */
  List<Samples> findByNameContaining(String param);
}
