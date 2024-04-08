package com.example.template.template.presentation.sample.controller;

import com.example.template.template.application.sample.AddSampleUseCase;
import com.example.template.template.application.sample.FilterSamplesUseCase;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



/**
 * フロントエンドからのリクエストに値を返却するRestAPIのサンプル。
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sample")
public class SampleRestController {

  private final GetSampleUseCase getSampleUseCase;

  private final AddSampleUseCase addSampleUseCase;

  private final FilterSamplesUseCase filterSamplesUseCase;

  /**
   * DBのサンプル情報を返却する。
   *
   * @return DBから取得したJSON形式のサンプルデータ
   */
  @GetMapping
  public List<SampleDto> getSample() {
    return getSampleUseCase.execute();
  }

  /**
   * リクエストしたデータをDBのサンプル情報に追加する。
   *
   * @param form 追加するサンプル情報をもつForm
   * @return ステータスコード
   */
  @PostMapping
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
   * コメントの記入者名が検索文字列に部分一致するサンプル情報を取得する。
   *
   * @param param 検索文字列
   * @return 検索文字列に部分一致するサンプル情報
   */
  @GetMapping("filter")
  public List<SampleDto> getSampleByName(
      @RequestParam(name = "param", required = false) String param) {
    return filterSamplesUseCase.execute(param);
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
