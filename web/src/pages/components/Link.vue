<template>
  <a :href="props.url" class="link">{{ props.label }}</a>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss">
/**
* 必要であれば... : hover, clicked, text-decoration, cursor, text-underline-offset
*/
.link {
  font-size: 14px;
  color: #a0bde6; /** 共通のカラーを用意する。 */
}
</style>
