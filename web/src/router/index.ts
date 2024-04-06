import { createWebHistory, createRouter } from 'vue-router';

import DashBoardView from '../pages/DashBoard.vue';
import AccountView from '../pages/Account.vue';
import FooBar from '../pages/FooBar.vue';

const routes = [
  { path: '/', component: DashBoardView },
  { path: '/users/:id', component: AccountView },
  { path: '/foobar', component: FooBar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
