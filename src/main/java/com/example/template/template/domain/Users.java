package com.example.template.template.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class Users {

  @Id
  @Column(name = "id")
  private String id;

  @Column(name = "name")
  private String name;
}
