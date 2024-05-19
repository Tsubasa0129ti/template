<template>
  <label class="label" for="">{{ label }} <span v-if="required" class="required">必須</span></label>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>

<style lang="scss">
.label {
}

.required {
  color: white;
  font-weight: 500;
  background: red; /* TODO: 共通要素を適用する */
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 1px 2px;
  margin-left: 1px;
}
</style>
