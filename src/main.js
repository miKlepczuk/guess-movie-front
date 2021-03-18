import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://127.0.0.1:8000/api/';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')