<template>
  <input v-model="input" class="input" type="text" :placeholder="placeholder" />
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

// TODO: 今後、`type`に他の要素を指定できるようにするべきかを検討する。passwordは必須か。inputTypeというものを用意するか。
defineProps({
  placeholder: {
    type: String,
    required: false,
    default: ''
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
</style>
