import './assets/main.css'
//import '../node_modules/flowbite-vue/dist/index.css'
import 'flowbite';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

window.toastr = toastr;

const app = createApp(App)
app.use(router)
app.mount('#app')