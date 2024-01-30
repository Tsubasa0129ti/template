package com.example.template.template.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
  @GetMapping("index")
  public String main() {
    System.out.println("test");
    return "index";
  }
  
}
