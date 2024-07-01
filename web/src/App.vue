<template>
  <ErrorMessage>
    <div>
      <span>{{ errorStore.message }}</span>
      <button v-if="errorStore.retry" @click="retryRequest">リトライ</button>
    </div>
  </ErrorMessage>
  <router-view></router-view>
</template>

<script setup lang="ts">
import ErrorMessage from '@components/ErrorMessage.vue';
import useRetry from '@composables/useRetry';
import { useErrorStore } from '@store/error-store';

const errorStore = useErrorStore();
const { retryRequest } = useRetry();
</script>
