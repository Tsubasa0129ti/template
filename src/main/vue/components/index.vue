<template>
  <button @click="count++">button</button>
  <p class="count">{{ count }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue';
const count = ref(0);

</script>

<style lang="scss">
  .count {
    font-size: 18px;
    color: red;
  }
</style>