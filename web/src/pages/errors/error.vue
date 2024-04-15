<template>
  <div>
    <h2>ページが表示できません。</h2>
    <p>管理者に問い合わせください。</p>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
const message = history.state.message;
</script>
