<template>
  <textarea
    :id="fieldName"
    v-model="input"
    class="input"
    :class="{ hasError: hasError }"
    :type="formType"
    :placeholder="hasError ? '' : placeholder"
    cols="30"
    rows="10"
  ></textarea>
</template>

<script setup lang="ts">
// TODO: 中身については検討していないので、後ほど修正する。
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
