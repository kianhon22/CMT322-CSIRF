<template>
  <nav class="bg-[#1E1B4B] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" class="flex items-center">
            <img src="/csirf-logo-white.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap text-white">CSIRF</span>
        </a>
        <div class="flex items-center">
          <!-- <a href="#" class="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-primary-300 rounded-lg text-lg px-4 py-2 lg:px-2 lg:py-1 mr-2 -700 focus:outline-none">Get started</a> -->
          <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="hidden justify-between items-center w-full lg:flex lg:w-auto" id="mobile-menu-2">
            <ul class="flex flex-col mt-4 text-lg lg:flex-row lg:space-x-8 lg:mt-0 ml-60">
                <li>
                  <router-link to="/"
                    class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                    active-class="!bg-orange-500 !text-[#1E1B4B]"
                  > Home
                  </router-link>
                </li>
                <div v-if="currentUser && (currentUser.role=='admin' || currentUser.role=='sponsor')">
                  <li>
                    <router-link to="/dashboard"
                      class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                      active-class="!bg-orange-500 !text-[#1E1B4B]"
                    > Dashboard
                    </router-link>
                  </li>
                </div>
                <li>
                  <router-link to="/announcement"
                    class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                    active-class="!bg-orange-500 !text-[#1E1B4B]"
                  > Announcement
                  </router-link>
                </li>
                <li>
                  <router-link to="/career"
                    class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                    active-class="!bg-orange-500 !text-[#1E1B4B]"
                  > Career
                  </router-link>
                </li>
                <li>
                  <router-link to="/company"
                    class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                    active-class="!bg-orange-500 !text-[#1E1B4B]"
                  > Company
                  </router-link>
                </li>
                <div v-if="currentUser && (currentUser.role=='sponsor' || currentUser.role=='student')">
                  <li>
                    <router-link to="/profile"
                      class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                      active-class="!bg-orange-500 !text-[#1E1B4B]"
                    > Profile
                    </router-link>
                  </li>
                </div>
                <div v-if="currentUser">
                  <li>
                    <button @click="logout"
                      class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                      active-class="!bg-orange-500 !text-[#1E1B4B]"
                    > Logout
                    </button>
                  </li>
                </div>
                <div v-else>
                  <li>
                    <router-link to="/login"
                      class="block px-4 py-2 lg:px-2 lg:py-1 pr-4 pl-3 text-white border-b border-gray-100 rounded-lg lg:border-0 lg:hover:bg-orange-500 hover:text-[#1E1B4B]"
                      active-class="!bg-orange-500 !text-[#1E1B4B]"
                    > Get Started
                    </router-link>
                  </li>
                </div>
            </ul>
        </div>
    </div>
  </nav>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const currentUser = inject('currentUser')
    return { currentUser }
  },
  methods: {
    logout() {
      currentUser = null
    }
  },
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
