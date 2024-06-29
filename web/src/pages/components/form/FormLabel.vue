<template>
  <label class="label" :for="labelFor"
    >{{ fieldName }} <span v-if="required" class="required">必須</span></label
  >
</template>

<script setup lang="ts">
import { ComputedRef, computed } from 'vue';

const props = defineProps({
  fieldName: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  isCheckbox: {
    type: Boolean,
    required: true
  }
});

/**
 * inputタグのtypeがcheckboxの時、for属性にfieldNameを適用する。
 */
const labelFor: ComputedRef<string | undefined> = computed(() => {
  return props.isCheckbox ? props.fieldName : undefined;
});
</script>

<style lang="scss">
.label {
  display: inline-block;
  margin-bottom: 2px;
}

.required {
  color: white;
  font-weight: 500;
  background: red; /* TODO: 共通要素を適用する */
  padding: 1px 2px;
  margin-left: 1px;
}
</style>
