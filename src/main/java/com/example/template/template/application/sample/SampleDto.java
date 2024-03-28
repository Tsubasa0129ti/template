package com.example.template.template.application.sample;

import com.example.template.template.domain.sample.Samples; // ドメインの規則に反していないかを確認。
import java.time.LocalDateTime;
import lombok.Getter;

/**
 * サンプル情報を格納するDTOクラス。
 */
@Getter
public class SampleDto {

  private String id;

  private String name;

  private String comment;

  private LocalDateTime createdAt;

  /**
   * サンプル情報を作成するコンストラクタ。
   *
   * @param sample サンプル情報のドメインクラス
   */
  public SampleDto(Samples sample) {
    this.id = sample.getId();
    this.name = sample.getName();
    this.comment = sample.getComment();
    this.createdAt = sample.getCreatedAt();
  }
}
