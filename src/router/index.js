import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
// import Job from '@/views/Job.vue'

const routes = [
    { path: '/', name: 'Home', component: Home},
    // { path: '/job', name: 'Job', component: Job},
    { path: '/register', name: 'Register', component: Register},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
