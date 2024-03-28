package com.example.template.template.application.sample;

import com.example.template.template.domain.sample.SampleRepository;
import com.example.template.template.domain.sample.Samples;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 受け取ったサンプル情報を永続化するユースケースクラス。
 */
@Service
@RequiredArgsConstructor
public class AddSampleUseCase {

  private final SampleRepository sampleRepository;

  /**
   * 取得したコマンドクラスをドメインに変換し、データベースに永続化する。
   *
   * @param command サンプル情報のコマンドクラス
   */
  public void execute(SampleCommand command) {

    Samples sample = new Samples(command);
    sampleRepository.save(sample);
  }
}
