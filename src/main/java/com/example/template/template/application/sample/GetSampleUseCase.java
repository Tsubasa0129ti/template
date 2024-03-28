package com.example.template.template.application.sample;

import com.example.template.template.domain.sample.SampleRepository;
import com.example.template.template.domain.sample.Samples;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * サンプル情報を取得するユースケースクラス。
 */
@Service
@RequiredArgsConstructor
public class GetSampleUseCase {

  private final SampleRepository sampleRepository;

  /**
   * DBから取得したサンプル情報をDTOに変換し、返却する。
   *
   * @return DTOに変換後のサンプル情報
   */
  public List<SampleDto> execute() {
    List<Samples> samples = sampleRepository.findAll();
    return samples.stream().map(SampleDto::new).collect(Collectors.toList());
  }
}
