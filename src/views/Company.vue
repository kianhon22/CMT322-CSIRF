<template>
    <section class="pt-12 bg-center bg-no-repeat bg-[url('/src/assets/neon-purple-modern-city-iegjsguqr41ak8ee.jpg')] bg-gray-500 bg-blend-multiply m-h-screen w-full flex flex-col items-center justify-center overflow-y-auto">
      <div v-if="company" class="flex items-center space-x-10">
        <!-- Logo -->
        <a href="https://www.ni.com/en.html?srsltid=AfmBOop8ibaz67DwGZZCiBc5O5kIgxtTyLUzwztKtg38RYomfSEcFf_o" target="_blank" class="flex-shrink-0">
          <img :src="company.logo" class="h-25" :alt="company.name" />
        </a>
        <!-- Text Section -->
        <div class="text-left">
          <span class="block text-4xl font-semibold whitespace-nowrap text-white">{{ company.name }}</span>
          <p class="text-xl text-gray-300">{{ company.shortDescription }}</p>
        </div>
      </div>
       <!-- Company Description -->
    <div v-if="company" class="mt-10 max-w-3xl">
    <h2 class="text-2xl font-semibold text-white mb-4">Company Description</h2>
    <p class="text-lg text-gray-300 leading-relaxed">
        {{ company.description }}
    </p>
    </div>
    <div id="default-carousel" class="relative w-1/3" data-carousel="slide">
        <!-- Carousel wrapper -->
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
            <!-- Item 1 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/office.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 2 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/office.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 3 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/office.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 4 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/office.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 5 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/office.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
        </div>
        <!-- Slider indicators -->
        <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
        </div>
        <!-- Slider controls -->
        <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
    </div>
    </section>
    <section>
        <div class="container mx-auto px-4 py-12">
            <h2 class="text-2xl font-semibold text-white mb-4">Career Available</h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <!-- Service 1 -->
                <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                    <img src="../assets/office.jpg" class="w-24 h-24 rounded-full" alt="...">
                    <h3 class="text-lg font-semibold text-gray-800 mt-4">Service 1</h3>
                    <p class="text-base text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <!-- Service 2 -->
                <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                    <img src="../assets/office.jpg" class="w-24 h-24 rounded-full" alt="...">
                    <h3 class="text-lg font-semibold text-gray-800 mt-4">Service 2</h3>
                    <p class="text-base text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <!-- Service 3 -->
                <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                    <img src="../assets/office.jpg" class="w-24 h-24 rounded-full" alt="...">
                    <h3 class="text-lg font-semibold text-gray-800 mt-4">Service 3</h3>
                    <p class="text-base text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import companyData from '@/data/companyData.json';

export default {
  props: ['id'], // Receive `id` from the route
  data() {
    return {
      company: null, // Store the specific company data
    };
  },
  mounted() {
    this.loadCompanyData();
  },
  watch: {
    id() {
      // Reload data when the route parameter changes
      this.loadCompanyData();
    },
  },
  methods: {
    loadCompanyData() {
      // Find the company matching the `id` from the route
      this.company = companyData.find(
        (company) => company.sponsorID === Number(this.id)
      );
    },
  },
};
</script>
