<template>
  <button class="button" @click="$emit('submit')">{{ label }}</button>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
});

defineEmits(['submit']);
</script>

<style lang="scss">
.button {
  display: block;
  background: #a0bde6;
  border-radius: 5px;
  border: 1px solid #a0bde6;
  width: 320px; /* レスポンシブ対応のため、min-widthとすることはできないだろうか？ */
  height: 52px;
  cursor: pointer;
  margin: 0 auto;

  font-size: 24px;
  color: #f2f2f2;

  &:hover {
    background: #bed8fc;
    color: #ffffff;
    border: #bed8fc;
  }
}
</style>
