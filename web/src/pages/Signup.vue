<template>
  <CommonHeader class="header" />
  <main class="main-container">
    <div class="title-wrapper">
      <h1 class="title">Create an Account</h1>
    </div>
    <div class="content-wrapper">
      <section class="login-form">
        <FormGroup
          v-model="username"
          field-name="Username"
          placeholder="ユーザー名を入力してください。"
          :error-message="errors.username"
          class="form-group"
        />
        <FormGroup
          v-model="email"
          field-name="Email"
          placeholder="メールアドレスを入力してください。"
          :error-message="errors.email"
          class="form-group"
        />
        <FormGroup
          v-model="password"
          field-name="Password"
          form-type="password"
          placeholder="パスワードを入力してください。"
          :error-message="errors.password"
          class="form-group"
        />
        <FormGroup
          v-model="confirmPassword"
          field-name="Confirm Password"
          form-type="password"
          placeholder="パスワード（確認用）を入力してください。"
          :error-message="errors.confirmPassword"
          class="form-group"
        />
        <FormButton label="Sign in" @submit="submit" />
      </section>
    </div>
    <div class="login-footer">
      <p>
        Already have an account?
        <span>
          <Link label="login" url="/login" />
        </span>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonHeader from './components/common/CommonHeader.vue';
import Link from './components/Link.vue';
import FormButton from './components/form/FormButton.vue';
import FormGroup from './components/form/FormGroup.vue';

// 入力情報を管理する。
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// バリデーションの結果などを表示する想定（型は、仮置き）
const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

/**
 * ログイン処理を実行する。（Spring Securityのイシューで対応する。）
 */
function submit() {
  console.log('login');
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.main-container {
  display: flex;
  padding: 80px 40px;
  justify-content: center; /* 左右中央寄せ */
  align-items: center; /* 上下中央寄せ */
  flex-direction: column; /* 子要素を縦並びにする */
  height: 100%;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.login-form {
  min-width: 420px;
}

.form-group {
  margin-bottom: 16px;
}

.form-link {
  display: block;
  margin-bottom: 16px;
}
</style>
