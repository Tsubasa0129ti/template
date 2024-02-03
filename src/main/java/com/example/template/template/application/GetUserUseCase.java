package com.example.template.template.application;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.template.template.domain.Users;
import com.example.template.template.domain.UserRepository;

@Service
public class GetUserUseCase {

  @Autowired
  private UserRepository userRepository;

  public List<Users> execute() {
    return userRepository.findAll();
  }
}
