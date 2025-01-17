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

const SESSION_TIMEOUT = 1 * 60 * 1000; // 1 minute
let lastActivityTime = Date.now(); // Store the last active timestamp

// Function to update the last activity timestamp
const updateLastActivity = () => {
    lastActivityTime = Date.now();
};

// Function to check session timeout
const checkSessionTimeout = () => {
    const currentTime = Date.now();
    if (currentTime - lastActivityTime > SESSION_TIMEOUT) {
        // Show a confirmation alert
        if (window.confirm('Your session has expired. Click confirm logout.')) {
            signOut(auth).then(() => {
                router.push('/login'); // Redirect to login page
            });
        } else {
            // User canceled, refresh last activity time to reset timeout
            lastActivityTime = Date.now();
        }
    }
};

// Set up event listeners for user activity
window.addEventListener('click', updateLastActivity);
window.addEventListener('mousemove', updateLastActivity);
window.addEventListener('keypress', updateLastActivity);

// Periodically check for session timeout
setInterval(checkSessionTimeout, 60 * 1000); // Check every minute

const app = createApp(App);
app.use(router);
app.mount('#app');