<template>
    <section class="bg-center bg-cover bg-no-repeat bg-[url('/csirf-background.png')] h-screen w-full flex items-center justify-center">
        <div class="flex flex-col items-center text-center px-8 py-8">
            <!-- <div class="h-56 w-56 lg:col-span-5 flex justify-start lg:pl-12">
                <img src="/csirf-logo-white.png" alt="CSIRF Logo" />
            </div> -->
            <div class="lg:col-span-7 text-center lg:text-center">
                <h1 class="text-white w-full mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-7xl">
                    COMPUTER SCIENCE INTERNSHIP & RECRUITMENT FAIR
                </h1>
                <p class="text-white w-full mb-6 font-light md:text-lg lg:text-2xl">
                    Fulfilling Dreams, Empowering Your Future
                </p>
                <div class="flex flex-col lg:flex-row justify-center gap-4 mt-12">
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
    <section class="bg-center bg-[#1E1B4B] py-8 w-full">
    <h1 class="text-4xl font-bold text-center mb-8 text-white">Company</h1>
    <div class="grid grid-cols-4 gap-6 pl-20 pr-20">
      <router-link
        v-for="(company, index) in companies"
        :key="index"
        :to="{ name: 'Company', params: { id: company.sponsorID }}"
        class="bg-white rounded-lg shadow-lg flex flex-col items-center p-4 hover:shadow-xl transition-shadow">
        <img :src="company.logo" :alt="company.name" class="h-24 w-24 object-contain rounded-full mb-4"/>
        <h3 class="text-lg font-semibold text-gray-800">{{ company.name }}</h3>
        <span :class="categoryClass(company.category)" class="px-3 py-1 mt-2 rounded-full text-sm font-medium">
          {{ capitalize(company.category) }}
        </span>
      </router-link>
    </div>
  </section>
  </template>

<script>
import companyData from "@/data/companyData.json";

export default {
  data() {
    return {
      companies: companyData,
    };
  },
  methods: {
    categoryClass(category) {
      switch (category) {
        case "platinum":
          return "bg-purple-200 text-purple-800";
        case "gold":
          return "bg-yellow-200 text-yellow-800";
        case "silver":
          return "bg-gray-200 text-gray-800";
        case "bronze":
          return "bg-orange-200 text-orange-800";
        default:
          return "bg-green-200 text-green-800";
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

