<template>
  <div>{{ errorMessage }}</div>
</template>

<script setup lang="ts">
defineProps({
  errorMessage: { type: String, required: false, default: null }
});
</script>
