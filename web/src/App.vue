<template>
  <ErrorMessage v-if="errorState.message" :error-message="errorState.message" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import ErrorMessage from './pages/components/ErrorMessage.vue';
import { errorState } from './plugins/error-handler';
</script>

<style scoped></style>
