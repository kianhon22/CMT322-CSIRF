import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
// import Career from '@/views/Career.vue'

const routes = [
    { path: '/', name: 'Home', component: Home},
    // { path: '/career', name: 'Career', component: Career},
    { path: '/register', name: 'Register', component: Register},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
