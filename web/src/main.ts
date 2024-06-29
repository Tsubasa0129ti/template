import { createApp } from 'vue';
import store from './store/index';
import './styles/style.scss';
import App from './App.vue';
import router from './router/index';
import { ErrorHandlerPlugin } from './plugins/error-handler';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ErrorHandlerPlugin);

app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
