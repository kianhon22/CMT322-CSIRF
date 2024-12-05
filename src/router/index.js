import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import Career from '@/views/Career.vue'
import Company from '@/views/Company.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Announcement from '@/views/Announcement.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/career', name: 'Career', component: Career },
  { path: '/company/:id', name: 'Company', component: Company, props: true },
  { path: '/announcement', name: 'Announcement', component: Announcement },
  { path: '/profile', name: 'Profile', component: Profile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        // Scroll to the element with the matching hash
        return {
          el: to.hash, // Scroll to the element with the ID matching the hash
          behavior: 'smooth', // Optional: Adds smooth scrolling
        };
      }
      return { top: 0 }; // Default: Scroll to top for other cases
    },
  });


export default router;
