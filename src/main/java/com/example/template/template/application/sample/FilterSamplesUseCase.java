package com.example.template.template.application.sample;

import com.example.template.template.domain.sample.SampleRepository;
import com.example.template.template.domain.sample.Samples;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * サンプル情報をコメントの記入者名で絞り込みをするユースケースクラス。
 */
@Service
@RequiredArgsConstructor
public class FilterSamplesUseCase {

  private final SampleRepository sampleRepository;

  /**
   * コメントの記入者名で絞り込みをしたサンプル情報を返却する。
   *
   * @param name コメントの記入者名
   * @return コメントの記入者名で絞り込みをしたサンプル情報
   */
  public List<SampleDto> execute(String name) {
    List<Samples> filteredSample = sampleRepository.findByName(name);

    return filteredSample.stream().map(SampleDto::new).collect(Collectors.toList());
  }
}
