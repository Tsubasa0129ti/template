<template>
  <CommonHeader class="header-layout" />
  <FormLayout>
    <template #formHeader>
      <h1>Reset Password</h1>
    </template>

    <template #formContent>
      <FormGroup
        v-model="password"
        field-name="Password"
        form-type="password"
        :required="true"
        :error-message="errors.password"
        class="form-group-layout"
      />
      <FormGroup
        v-model="confirmPassword"
        field-name="Confirm Password"
        form-type="password"
        :required="true"
        :error-message="errors.confirmPassword"
        class="form-group-layout"
      />
      <FormButton label="Reset Password" />
    </template>
    <template #formFooter>
      <p>
        <Link label="Back to DashBoard" url="/" />
      </p>
    </template>
  </FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonHeader from '@components/common/CommonHeader.vue';
import FormLayout from '@components/layout/FormLayout.vue';
import FormGroup from '@components/form/FormGroup.vue';
import FormButton from '@components/form/FormButton.vue';
import Link from '@components/Link.vue';

const password = ref('');
const confirmPassword = ref('');

const errors = ref({
  password: '',
  confirmPassword: ''
});
</script>

<style lang="scss">
.header-layout {
  margin: 30px 0;
}

.form-group-layout {
  margin-bottom: 16px;
}
</style>
