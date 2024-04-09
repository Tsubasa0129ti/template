package com.example.template.template.presentation.sample.form;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

/**
 * 追加するDBのサンプル情報をもつFormクラス。
 */
@Getter
public class SampleForm {

  /** コメントの記入者名 */
  @NotBlank(message = "名前は必須です。")
  @Length(max = 10)
  private String name;

  /** コメントの内容 */
  @NotBlank(message = "コメントは必須です。")
  @Length(max = 100)
  private String comment;
}
