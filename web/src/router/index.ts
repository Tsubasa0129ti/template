import { createWebHistory, createRouter } from 'vue-router';

import DashBoardView from '../pages/DashBoard.vue';
import SignupView from '../pages/Signup.vue';
import LoginView from '../pages/Login.vue';
import AccountView from '../pages/Account.vue';
import PasswordForgotView from '../pages/password/PasswordForgot.vue';
import PasswordResetView from '../pages/password/PasswordReset.vue';
import SampleView from '../pages/sample/SampleView.vue';
import NotFound from '../pages/errors/NotFound.vue';
import Error from '../pages/errors/error.vue';

const routes = [
  { path: '/', component: DashBoardView },
  { path: '/signup', component: SignupView },
  { path: '/login', component: LoginView },
  { path: '/users/:id', component: AccountView },
  {
    path: '/password',
    children: [
      {
        path: 'forgot',
        component: PasswordForgotView
      },
      {
        path: 'reset',
        component: PasswordResetView
      }
    ]
  },
  { path: '/sample', component: SampleView },
  { path: '/error', name: 'error', component: Error, props: true },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
