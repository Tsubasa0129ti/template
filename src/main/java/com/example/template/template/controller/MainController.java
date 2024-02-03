package com.example.template.template.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.template.template.application.GetUserUseCase;
import com.example.template.template.domain.Users;


@Controller
public class MainController {

  @Autowired
  private GetUserUseCase getUserUseCase;

  @GetMapping("index")
  public String main() {
    System.out.println("test");
    return "index";
  }

  /**
   * 結果をThymeleafで出力する。
   */
  @GetMapping("db")
  public String getRecord(Model model) {
      List<Users> users = getUserUseCase.execute();
      System.out.println(users);
      model.addAttribute("users", users);
      return "db_sample";
  }
  
  
}
