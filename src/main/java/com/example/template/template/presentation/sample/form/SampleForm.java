package com.example.template.template.presentation.sample.form;

import org.hibernate.validator.constraints.Length;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

/**
 * 追加するDBのサンプル情報をもつFormクラス。
 */
@Getter
public class SampleForm {

  /** コメントの記入者名 */
  @NotNull(message = "名前は必須です。")
  private String name;

  /** コメントの内容 */
  @NotNull(message = "コメントは必須です。")
  @Length(max = 100)
  private String comment;
}
