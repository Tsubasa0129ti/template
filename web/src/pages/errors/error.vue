<template>
  <header>
    <div v-if="statusCode">{{ statusCode }} {{ responseStatus }}</div>
    <div v-else></div>
    <div>{{ getTime() }}</div>
  </header>
  <div class="detail">
    <p>{{ message }}</p>
    <p>管理者にお問合せください。</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HttpStatusCode } from 'axios';

const message = history.state.message;
const statusCode = history.state.statusCode;
const responseStatus = ref('');

onMounted(() => {
  if (statusCode) {
    responseStatus.value = getResponseStatus();
  }
});

function getTime(): string {
  const nowTime = new Date();
  return `${nowTime.getFullYear()}/${nowTime.getMonth() + 1}/${nowTime.getDate()} ${nowTime.getHours()}:${nowTime.getMinutes()}`;
}

function getResponseStatus(): string {
  return HttpStatusCode[statusCode];
}
</script>
