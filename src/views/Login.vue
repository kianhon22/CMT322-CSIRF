<template>
  <section class="bg-[#1E1B4B]">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a
            href="#"
            class="flex items-center justify-center text-3xl font-semibold text-black"
          >
            <img
              class="w-12 h-14 mr-2"
              src="/csirf-logo-purple.png"
              alt="CSIRF logo"
            />
            CSIRF
          </a>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login()">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email <span class="text-red-700">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                placeholder="abc@usm.my"
                required=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password <span class="text-red-700">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                required=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div v-if="errorMessage" class="text-red-600 text-sm">
              {{ errorMessage }}
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-[#1E1B4B] text-[#1E1B4B]"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                  I accept the
                  <a
                    href="#"
                    class="font-medium text-[#1E1B4B] hover:underline"
                    >Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-[#2f2975] hover:bg-[#1E1B4B] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >Start Exploring
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Haven't registered?
              <a href="#" class="font-medium text-[#1E1B4B] hover:underline"
                >Register Now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userData from '../data/userData.json';
import { inject } from 'vue';

export default {
  setup() {
    const currentUser = inject('currentUser')
    return { currentUser }
  },

  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },

  methods: {
    login() {
      this.errorMessage = '';   // Reset the error message

      const roles = ['admin', 'sponsor', 'student'];
      for (let role of roles) {
        // Find a user that matches the email and password
        const user = userData[role].find(
          (user) => user.email == this.email && user.password == this.password
        );

        if (user) {
          // If a match is found, assign the user to currentUser and exit the loop
          this.currentUser = user;  // Update the currentUser in userData
          this.$router.push('/');  
          return;
        }
      }

      // If no match was found, set the error message
      this.errorMessage = 'Invalid email or password. Please try again.';
    },
  },

  // computed: {
  //   currentUser() {
  //     return this.mockData.currentUser || {
  //       name: "Guest",
  //       role: "guest",
  //     };
  //   },
  // },
}
</script>

<style>
/* Optional custom styles */
</style>