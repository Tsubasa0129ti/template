<template>
  <div class="form-error">
    <font-awesome-icon class="error-icon" icon="circle-exclamation" />
    <span class="error-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss">
.form-error {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: red;
  margin: 0;
  margin-top: 3px;
  max-width: 420px;
}

.error-message {
  flex: 1;
  margin-left: 4px;
  word-break: break-word;
}
</style>
