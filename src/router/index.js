import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Career from '@/views/Career.vue'
import Company from '@/views/Company.vue'

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/career', name: 'Career', component: Career},
    { path: '/login', name: 'Login', component: Login},
    { path: '/company/:id', name: 'Company', component: Company},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
