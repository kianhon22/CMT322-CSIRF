<template>
    <section class="pt-12 bg-center bg-cover bg-[url('/csirf-background.png')] bg-gray-500 bg-blend-multiply m-h-screen w-full flex flex-col items-center justify-center overflow-y-auto">
    <!-- Back Button -->
    <div class="absolute top-20 left-5">
        <button
        @click="navigateBack"
        class="flex items-center px-3 py-2 text-gray-900 bg-white border border-transparent rounded-lg hover:bg-transparent hover:border-white hover:text-white">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 25 25"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
        Back
        </button>
    </div>

        <!-- Company Header -->
    <div v-if="company" class="flex items-center space-x-10">
      <!-- Company Logo -->
      <a :href="company.website || '#'" target="_blank" class="flex-shrink-0">
        <img :src="company.logo" class="h-25" :alt="company.name" />
      </a>
      <!-- Company Info -->
      <div class="text-left max-w-md">
        <span class="block text-4xl font-semibold whitespace-nowrap text-white">
          {{ company.name }}
        </span>
        <p class="text-xl text-gray-300 mt-2">{{ company.shortDescription }}</p>
      </div>
    </div>

    <!-- Company Description -->
    <div v-if="company" class="mt-10 max-w-3xl">
      <h2 class="text-2xl font-semibold text-white mb-4">Company Description</h2>
      <p class="text-lg text-gray-300 leading-relaxed">{{ company.description }}</p>
    </div>

    <!-- Carousel -->
    <div id="default-carousel" class="relative w-2/5 mb-7 mt-5" data-carousel="slide">
        <!-- Carousel wrapper -->
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
            <!-- Item 1 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/company.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 2 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/office1.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 3 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/canteen.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 4 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/meetingroom.jpeg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
            </div>
            <!-- Item 5 -->
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="../assets/gymroom.jpg" loading="lazy" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image">
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

    <!-- Career Available -->
    <section>
        <div class="mx-auto px-4 py-8 bg-[#1E1B4B]">
            <h2 class="text-4xl font-semibold text-white mb-6 text-center">Careers Available</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <fwb-card
                    v-for="job in filteredJobs"
                    :key="job.id"
                    class="bg-white backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    @click="openModal(job)">
                    <div class="p-6">
                        <div class="flex items-center gap-4 mb-4">
                            <img
                                v-if="getCompanyLogo(job.name)"
                                :src="getCompanyLogo(job.name)"
                                :alt="job.name"
                                class="w-16 h-16 object-contain rounded-lg"
                            />
                            <div>
                                <h5 class="text-2xl font-bold tracking-tight text-gray-900">
                                    {{ job.name }}
                                </h5>
                                <p class="font-normal text-gray-700">
                                    {{ job.position }}
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-start gap-2 mb-3">
                            <span class="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                {{ job.type }}
                            </span>
                            <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                {{ job.mode }}
                            </span>
                        </div>
                        <button @click="openModal(job)" class="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-center text-white bg-[#1E1B4B] rounded-lg hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
                            Apply Now
                            <svg class="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                    </div>
                </fwb-card>
            </div>

            <!-- Job Modal -->
            <Modal
            :isOpen="isModalOpen"
            :title="selectedJob?.name"
            :description="selectedJob?.position"
            :jobDescription="selectedJob?.description"
            :showCompanyDetails="false"
            @close="closeModal"
            />
        </div>
    </section>
</template>

<script>
import { initFlowbite } from 'flowbite'
import Modal from '@/components/JobModal.vue';
import jobData from '../data/jobData.json';
import companyData from '../data/companyData.json';

export default {
  props: ['id'], // Receives `id` from the route
  components: { Modal },
  data() {
    return {
      company: null, // The current company data
      jobs: jobData, // List of all jobs
      isModalOpen: false, // Controls modal visibility
      selectedJob: null, // Stores the job selected for the modal
    };
  },
  computed: {
    filteredJobs() {
      if (!this.company) return [];
      // Filter jobs by company name
      return this.jobs.filter(job => job.name === this.company.name);
    },
  },
  mounted() {
    initFlowbite();
    this.loadCompanyData();
  },
  methods: {
    loadCompanyData() {
      // Find the company matching the `id` from the route
      this.company = companyData.find(company => company.sponsorID === Number(this.id));
    },
    navigateBack() {
        this.$router.push('/'); // Adjust the path to match your Home route
    },
    openModal(job) {
      this.selectedJob = job;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedJob = null;
    },
    getCompanyLogo(jobCompanyName) {
      const company = companyData.find(obj => obj.name === jobCompanyName);
      return company ? company.logo : null;
    },
  },
};
</script>

<!-- <script>
import { initFlowbite } from 'flowbite'
import companyData from '@/data/companyData.json';

export default {
  props: ['id'], // Receive `id` from the route
  data() {
    return {
      company: null, // Store the specific company data
    };
  },
  mounted() {
    initFlowbite();
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
</script> -->
