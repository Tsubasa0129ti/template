<template>
  <div>
    <FormLabel :field-name="fieldName" :is-checkbox="isCheckbox" :required="required" />
    <component
      :is="formInputComponent[formType]"
      v-model="input"
      :field-name="fieldName"
      :form-type="formType"
      :placeholder="placeholder"
      :has-error="hasError"
    />
    <FormError v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, defineModel } from 'vue';
import FormLabel from './FormLabel.vue';
import FormInput from './FormInput.vue';
import FormTextarea from './FormTextarea.vue';
import FormError from './FormError.vue';

const props = defineProps({
  fieldName: {
    type: String,
    required: true
  },
  formType: {
    type: String,
    required: false,
    default: 'text'
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  errorMessage: {
    type: String,
    required: false,
    default: ''
  }
});

const formInputComponent: { [key: string]: unknown } = {
  text: FormInput,
  password: FormInput,
  textarea: FormTextarea
};

/**
 * inputタグのtype属性がcheckboxかどうかを判定する。
 */
const isCheckbox: ComputedRef<boolean> = computed(() => {
  return props.formType === 'checkbox' ? true : false;
});

/**
 * 入力した内容にエラーがあるかどうか。
 */
const hasError: ComputedRef<boolean> = computed(() => {
  return props.errorMessage ? true : false;
});

const input = defineModel<string>();
</script>
