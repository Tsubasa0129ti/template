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
   * コメントの記入者名が検索文字列に部分一致するサンプル情報を取得する。
   *
   * @param param 検索文字列
   * @return 検索文字列に部分一致するサンプル情報
   */
  public List<SampleDto> execute(String param) {
    List<Samples> filteredSample = sampleRepository.findByNameContaining(param);

    return filteredSample.stream().map(SampleDto::new).collect(Collectors.toList());
  }
}
