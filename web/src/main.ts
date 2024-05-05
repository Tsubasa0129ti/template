import { createApp } from 'vue';
import store from './store/index';
import './styles/style.scss';
import App from './App.vue';
import router from './router/index';
import { ErrorHandlerPlugin } from './plugins/error-handler';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ErrorHandlerPlugin);

app.mount('#app');
