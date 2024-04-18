import { createApp } from 'vue';
import './styles/style.scss';
import App from './App.vue';
import router from './router/index';
import { ErrorHandlerPlugin } from './plugins/error-handler';

const app = createApp(App);

app.use(router);
app.use(ErrorHandlerPlugin);

app.mount('#app');
