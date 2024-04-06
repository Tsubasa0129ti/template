<script setup lang="ts">
import { onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

onMounted(() => {
  axiosInstance
    .get('/sample')
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
});
</script>

<template>
  <router-link to="/">DashBoard</router-link>
  <router-link to="/login">Login</router-link>
  <router-view></router-view>
</template>

<style scoped></style>
