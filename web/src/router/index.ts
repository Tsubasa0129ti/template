import { createWebHistory, createRouter } from 'vue-router';

import DashBoardView from '../pages/DashBoard.vue';
import FooBar from '../pages/FooBar.vue';

const routes = [
  { path: '/', component: DashBoardView },
  { path: '/foobar', component: FooBar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
