import { createApp } from 'vue';
import './styles/style.scss';
import App from './pages/App.vue';
import router from './router/index';

createApp(App).use(router).mount('#app');
