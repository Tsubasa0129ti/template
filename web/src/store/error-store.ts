import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ErrorState {
  error: Error;
  message: string;
  retry: boolean;
}

export const useErrorStore = defineStore('error', () => {
  const error = ref();
  const message = ref('');
  const retry = ref(false);

  function updateErrorState(newState: ErrorState) {
    error.value = newState.error;
    message.value = newState.message;
    retry.value = newState.retry;
  }

  return { error, message, retry, updateErrorState };
});
