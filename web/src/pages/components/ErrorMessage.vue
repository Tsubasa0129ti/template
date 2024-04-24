<template>
  <div>{{ errorMessage }} <button v-if="canRetry" @click="retry">リトライ</button></div>
</template>

<script setup lang="ts">
defineProps({
  errorMessage: { type: String, required: false, default: null },
  canRetry: { type: Boolean, required: false, default: false }
});

function retry() {
  // TODO: リトライの方法を考える。画面リロードでは不適切なケースがあるため。POST処理の場合など...
  console.log('リトライが要求されました。');
}
</script>
