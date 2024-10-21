import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axiosPlugin from './plugins/axios';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(axiosPlugin);
app.mount('#app');