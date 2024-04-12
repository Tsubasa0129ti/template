package com.example.template.template.domain.sample;

import com.example.template.template.application.sample.SampleCommand;
import com.example.template.template.domain.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * サンプルの情報をもつドメインクラス。
 */
@Entity
@Table(name = "samples")
@NoArgsConstructor
@Getter
public class Samples extends AbstractEntity {

  /** コメントの一意のID */
  @Id
  @Column(name = "id")
  private String id;

  /** コメントの記入者名 */
  @Column(name = "name")
  private String name;

  /** コメントの内容 */
  @Column(name = "comment")
  private String comment;

  /**
   * コマンドクラスからサンプルのドメインクラスを作成する。
   *
   * @param command サンプルのコマンドクラス
   */
  public Samples(SampleCommand command) {
    this.id = UUID.randomUUID().toString();
    this.name = command.getName();
    this.comment = command.getComment();
  }
}
