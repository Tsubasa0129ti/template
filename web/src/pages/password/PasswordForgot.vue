<template>
  <CommonHeader class="header-layout" />
  <FormLayout>
    <template #formHeader>
      <h1>Forgot Password</h1>
      <p>Enter your e-mail address and we will send you instructions to reset your password.</p>
    </template>

    <template #formContent>
      <FormGroup
        v-model="email"
        field-name="Email"
        :required="true"
        :error-message="errors.email"
        class="form-group-layout"
      />
      <FormButton label="Submit" />
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

const email = ref('');

const errors = ref({
  email: ''
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
