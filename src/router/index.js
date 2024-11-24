import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import Career from '@/views/Career.vue'
import Company from '@/views/Company.vue'
import Login from '@/views/Login.vue'

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/dashboard', name: 'Dashboard', component: Dashboard},
    { path: '/career', name: 'Career', component: Career},
    { path: '/login', name: 'Login', component: Login},
    { path: '/company/:id', name: 'Company', component: Company, props: true},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
