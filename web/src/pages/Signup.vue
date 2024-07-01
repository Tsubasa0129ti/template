<template>
  <CommonHeader class="header-layout" />
  <FormLayout>
    <template #formHeader>
      <h1 class="title">Create an Account</h1>
    </template>

    <template #formContent>
      <FormGroup
        v-model="username"
        field-name="Username"
        placeholder="ユーザー名を入力してください。"
        :error-message="errors.username"
        class="form-group-layout"
      />
      <FormGroup
        v-model="email"
        field-name="Email"
        placeholder="メールアドレスを入力してください。"
        :error-message="errors.email"
        class="form-group-layout"
      />
      <FormGroup
        v-model="password"
        field-name="Password"
        form-type="password"
        placeholder="パスワードを入力してください。"
        :error-message="errors.password"
        class="form-group-layout"
      />
      <FormGroup
        v-model="confirmPassword"
        field-name="Confirm Password"
        form-type="password"
        placeholder="パスワード（確認用）を入力してください。"
        :error-message="errors.confirmPassword"
        class="form-group-layout"
      />
      <FormButton label="Sign in" @submit="submit" />
    </template>

    <template #formFooter>
      <p>
        Already have an account?
        <span>
          <Link label="login" url="/login" />
        </span>
      </p>
    </template>
  </FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonHeader from '@components/common/CommonHeader.vue';
import Link from '@components/Link.vue';
import FormButton from '@components/form/FormButton.vue';
import FormGroup from '@components/form/FormGroup.vue';
import FormLayout from '@components/layout/FormLayout.vue';

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

<style lang="scss" scoped>
.header-layout {
  margin: 30px 0;
}

.form-group-layout {
  margin-bottom: 16px;
}
</style>
