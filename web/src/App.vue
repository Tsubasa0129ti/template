<script setup lang="ts">
import { onMounted } from 'vue';
import getRepository from './api/repositoryFactory';

onMounted(() => {
  getRepository().samples.getAll();
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
