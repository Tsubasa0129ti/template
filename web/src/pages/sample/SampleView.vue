<template>
  <div>
    <div class="comment-view">
      <div class="filter-comment">
        <input v-model="input" />
        <button type="submit" @click="filterComment">絞り込み</button>
      </div>
      <div v-for="sample in samples" :key="sample.id" class="comment">
        <p>{{ sample.name }}</p>
        <p>{{ sample.createdAt }}</p>
        <p>{{ sample.comment }}</p>
      </div>
    </div>
    <div class="post-comment"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getRepository from '../../api/repositoryFactory';
import { SampleDto } from '../../store/samples/SampleDto';

const samples = ref<SampleDto[]>([]);
const input = ref('');

onMounted(() => {
  getRepository()
    .samples.getAll()
    .then((sampleDtos) => {
      samples.value = sampleDtos.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

function filterComment() {
  getRepository()
    .samples.filterByUserName(input.value)
    .then((sampleDtos) => {
      samples.value = sampleDtos.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
