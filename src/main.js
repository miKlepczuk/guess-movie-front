import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const API_URL = 'https://127.0.0.1:8000/api/';

axios.defaults.baseURL = API_URL;

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        router.push({ name: "login" });
    } else {
        return Promise.reject(error);
    }
});


const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
