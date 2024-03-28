package com.example.template.template.application.sample;

import com.example.template.template.presentation.sample.form.SampleForm;
import lombok.Getter;

/**
 * サンプル情報のコマンドクラス。
 */
@Getter
public class SampleCommand {
  /** コメントの記入者名 */
  private String name;

  /** コメントの内容 */
  private String comment;

  public SampleCommand(SampleForm form) {
    this.name = form.getName();
    this.comment = form.getComment();
  }
}
