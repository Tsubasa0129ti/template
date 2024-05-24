<template>
  <CommonHeader class="header-layout" />
  <FormLayout>
    <template #formHeader>
      <h1>Reset Password</h1>
    </template>

    <template #formContent>
      <FormGroup
        field-name="Password"
        :required="true"
        :error-message="passwordError"
        class="form-group-layout"
      />
      <FormGroup
        field-name="Confirm Password"
        :required="true"
        :error-message="confirmPasswordError"
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
import CommonHeader from '../components/common/CommonHeader.vue';
import FormLayout from '../components/layout/FormLayout.vue';
import FormGroup from '../components/form/FormGroup.vue';
import FormButton from '../components/form/FormButton.vue';
import Link from '../components/Link.vue';

const passwordError = ref('');
const confirmPasswordError = ref('');
</script>

<style lang="scss">
.header-layout {
  margin: 30px 0;
}

.form-group-layout {
  margin-bottom: 16px;
}
</style>
