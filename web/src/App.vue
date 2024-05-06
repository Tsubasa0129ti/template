<template>
  <ErrorMessage>
    <div>
      <span>{{ errorState.message }}</span>
      <button v-if="errorState.retry" @click="retryRequest">リトライ</button>
    </div>
  </ErrorMessage>
  <router-view></router-view>
</template>

<script setup lang="ts">
import ErrorMessage from './pages/components/ErrorMessage.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import useRetry from './composables/useRetry';

const store = useStore();
const { retryRequest } = useRetry();
const errorState = computed(() => {
  return store.state.errorState;
});
</script>
