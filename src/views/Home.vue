<template>
  <section class="bg-center bg-no-repeat bg-[url('/src/assets/neon-purple-modern-city-iegjsguqr41ak8ee.jpg')] bg-gray-500 bg-blend-multiply h-screen w-full">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <a href="/" class="flex items-center">
            <img src="/csirf-logo.png" class="mr-3 h-6 sm:h-9" alt="CSIRF Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CSIRF</span>
        </a>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Fulfilling Dreams, Empowering Your Future</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <router-link to="/event" 
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Exciting Events
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </router-link>
            <router-link to="/career" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Explore Career
            </router-link>  
        </div>
      </div>
  </section>
  <section class="bg-center bg-[#1E1B4B] h-screen w-full">
      
  </section>
</template>

<script>
export default {};
</script>  