<template>
  <div>
    <FormLabel :label="label" :required="required" />
    <FormInput v-model="input" :placeholder="placeholder" />
    <FormError v-if="message" :message="message" />
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import FormLabel from './FormLabel.vue';
import FormInput from './FormInput.vue';
import FormError from './FormError.vue';

defineProps({
  label: {
    type: String,
    required: true
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
  // オブジェクト形式にする必要があるかもしれない
  message: {
    type: String,
    required: false,
    default: ''
  }
});

const input = defineModel<string>();
</script>
