package com.example.template.template.presentation.sample.controller;

import com.example.template.template.application.sample.AddSampleUseCase;
import com.example.template.template.application.sample.GetSampleUseCase;
import com.example.template.template.application.sample.SampleCommand;
import com.example.template.template.application.sample.SampleDto;
import com.example.template.template.presentation.sample.form.SampleForm;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


/**
 * フロントエンドからのリクエストに値を返却するRestAPIのサンプル。
 */
@RestController
@RequiredArgsConstructor
public class SampleRestController {

  private final GetSampleUseCase getSampleUseCase;

  private final AddSampleUseCase addSampleUseCase;

  /**
   * DBのサンプル情報を返却する。
   *
   * @return DBから取得したJSON形式のサンプルデータ
   */
  @GetMapping("sample")
  public List<SampleDto> getSample() {
    return getSampleUseCase.execute();
  }

  /**
   * リクエストしたデータをDBのサンプル情報に追加する。
   *
   * @param form 追加するサンプル情報をもつForm
   * @return ステータスコード
   */
  @PostMapping("sample")
  public ResponseEntity<?> addSample(@RequestBody @Validated SampleForm form,
      BindingResult result) {

    // バリデーションを実装する。
    Map<String, String> errors = new HashMap<>();

    if (result.hasErrors()) {
      for (FieldError error : result.getFieldErrors()) {
        errors.put(error.getField(), error.getDefaultMessage());
      }
      return ResponseEntity.badRequest().body(errors);
    }

    SampleCommand command = new SampleCommand(form);
    addSampleUseCase.execute(command);

    // ResponseEntityを返却する。
    return ResponseEntity.ok().body(null);
  }


}
