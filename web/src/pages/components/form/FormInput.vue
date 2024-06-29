<template>
  <input
    :id="fieldName"
    v-model="input"
    class="input"
    :class="{ hasError: hasError }"
    :type="formType"
    :placeholder="hasError ? '' : placeholder"
  />
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

defineProps({
  fieldName: {
    type: String,
    required: true
  },
  formType: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  hasError: {
    type: Boolean,
    required: true
  }
});

const input = defineModel<string>();
</script>

<style lang="scss">
.input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid transparent;
  background: #eaedf2;
  border-radius: 5px;
  height: 48px;
  padding: 4px 8px;

  &::placeholder {
    color: #b6b6b6;
  }
}

.hasError {
  border: 1px solid #ff3131;
  background: #fbe3e1;

  &:focus {
    outline: 1px solid #ff3131;
  }
}
</style>
