<template>
    <section class="bg-center bg-cover bg-no-repeat bg-[url('/csirf-background.png')] h-screen w-full flex items-center justify-center">
        <div class="grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-16 lg:grid-cols-12 items-center">
            <div class="h-56 w-56 lg:col-span-5 flex justify-start lg:pl-12">
                <img src="/csirf-logo-white.png" alt="CSIRF Logo" />
            </div> 
            <div class="lg:col-span-7 text-center lg:text-left">
                <h1 class="text-white max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                    CSIRF
                </h1>
                <p class="text-white max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">
                    Fulfilling Dreams, Empowering Your Future
                </p>
                <div class="flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
                    <router-link to="/event"
                    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#1E1B4B] rounded-lg bg-orange-500 hover:bg-orange-700 focus:ring-4">
                    Exciting Events
                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    </router-link>
                    <router-link to="/career"
                    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#1E1B4B] rounded-lg bg-white hover:bg-orange-500">
                    Explore Career
                    </router-link>  
                </div>
            </div>
        </div>
    </section>
    <section class="bg-center bg-[#1E1B4B] h-screen w-full">
    </section>
  </template>
  
  <script>
  export default {};
  </script>