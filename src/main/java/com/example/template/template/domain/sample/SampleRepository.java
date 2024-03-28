package com.example.template.template.domain.sample;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * サンプル情報とのやり取りを行うリポジトリークラスのインタフェース。
 */
@Repository
public interface SampleRepository extends JpaRepository<Samples, String> {

}
