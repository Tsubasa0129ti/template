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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
  public ResponseEntity<?> addSample(@RequestBody @Validated SampleForm form, BindingResult result)
      throws IllegalArgumentException, Exception {

    Map<String, String> errors = new HashMap<>();

    if (result.hasErrors()) {
      for (FieldError error : result.getFieldErrors()) {
        errors.put(error.getField(), error.getDefaultMessage());
      }
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    SampleCommand command = new SampleCommand(form);

    try {
      addSampleUseCase.execute(command);
    } catch (IllegalArgumentException e) {
      throw new IllegalArgumentException(e);
    } catch (Exception e) {
      throw new Exception(e);
    }

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  /**
   * 不正な引数を取得した際の例外ハンドリング。
   *
   * @param e IllegalArgumentException
   * @return エラーメッセージとステータスコード
   */
  @ExceptionHandler({ IllegalArgumentException.class })
  public ResponseEntity<?> illegalArgumentExceptionHandler(IllegalArgumentException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  /**
   * 不明な例外を補足した場合の例外ハンドリング。
   *
   * @param e Exception
   * @return エラーメッセージとステータスコード
   */
  @ExceptionHandler({ Exception.class })
  public ResponseEntity<?> exceptionHandler(Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
  }

}
