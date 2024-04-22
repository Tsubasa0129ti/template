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
    <div class="post-comment">
      <div class="input-name">
        <p v-if="nameError" class="name-error">{{ nameError }}</p>
        <input v-model="name" />
      </div>
      <div class="input-comment">
        <p v-if="commentError" class="comment-error">{{ commentError }}</p>
        <input v-model="comment" />
      </div>
      <button type="submit" @click="postComment">投稿する</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import getRepository from '../../api/repositoryFactory';
import { SampleDto } from '../../store/samples/SampleDto';
import SampleForm from '../../models/samples/SampleForm';
import router from '../../router';
import { UnprocessableEntity } from '../../utils/custom-error';
import { AxiosError } from 'axios';

const route = useRoute();

const samples = ref<SampleDto[]>([]);

/** コメントの検索文字列 */
const input = ref('');

/** コメントの記入者名 */
const name = ref('');

/** コメントの内容 */
const comment = ref('');

const nameError = ref('');
const commentError = ref('');

onMounted(() => {
  const query = route.query.q;

  if (typeof query === 'string') {
    input.value = query;
  }

  getRepository()
    .samples.filterByUserName(input.value)
    .then((sampleDtos) => {
      samples.value = sampleDtos.data;
    });
});

/**
 * コメントの記入者で投稿済みのコメントを絞り込む。
 */
function filterComment() {
  router.push({ path: 'sample', query: { q: input.value } });
}

/**
 * 新規にコメントを投稿する。
 */
function postComment() {
  const form: SampleForm = new SampleForm(name.value, comment.value);
  getRepository()
    .samples.addSample(form)
    .then(() => {
      resetMessage();
    })
    .catch((error) => {
      if (error instanceof UnprocessableEntity) {
        const axiosError = error.originalError as AxiosError;
        const messages = axiosError.response?.data as { [key: string]: string };
        nameError.value = messages.name;
        commentError.value = messages.comment;
      } else {
        throw error;
      }
    });
}

/**
 * 各メッセージの値を初期化する。
 */
function resetMessage() {
  name.value = '';
  nameError.value = '';
  comment.value = '';
  commentError.value = '';
}
</script>
