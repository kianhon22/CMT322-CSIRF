import './assets/main.css';
import 'flowbite';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

window.toastr = toastr;

const SESSION_TIMEOUT = 30 * 60 * 1000; //  30 min inactive period
let lastActivityTime = Date.now(); // Store the last active timestamp

// Function to update the last activity timestamp
const updateLastActivity = () => {
    lastActivityTime = Date.now();
};

// Function to check session timeout
const checkSessionTimeout = () => {
    if (!auth.currentUser) {
        // Skip the timeout check if no authenticated user
        return;
    }
    const currentTime = Date.now();
    if (currentTime - lastActivityTime > SESSION_TIMEOUT) {
        // Display an alert with only "OK" to confirm logout
        alert('Your session has expired. You will be logged out.');

        // Automatically log out after the alert is acknowledged
        signOut(auth).then(() => {
            toastr.warning('You have been logged out due to inactivity.');
            router.push('/login'); // Redirect to login page
        });
    }
};

// Set up event listeners for user activity
window.addEventListener('click', updateLastActivity);
window.addEventListener('mousemove', updateLastActivity);
window.addEventListener('keypress', updateLastActivity);

// Periodically check for session timeout
setInterval(checkSessionTimeout, 1 * 60 * 1000); // Check every min

const app = createApp(App);
app.use(router);
app.mount('#app');