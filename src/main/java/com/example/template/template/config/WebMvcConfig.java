package com.example.template.template.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORSの設定を行うクラス。
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

  /**
   * CORSの設定を許可する。
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    /* TODO: 本番環境の場合のoriginを動的に指定できる様にする。 */
    registry.addMapping("/api/**").allowedOrigins("http://localhost:3000")
        .allowedMethods("GET", "POST", "PUT", "DELETE").allowedHeaders("*");
  }
}
