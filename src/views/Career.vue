<template>
  <section class="min-h-screen bg-center bg-no-repeat bg-[url('/src/assets/neon-purple-modern-city-iegjsguqr41ak8ee.jpg')] bg-gray-500 bg-blend-multiply p-8">
    <h1 class="text-5xl font-bold text-center mt-3 mb-2 text-white">Career Opportunities</h1>
    <p class="text text-center mb-10 text-orange-500 flex justify-center items-center gap-2">
      Click on the job for more details!
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-6 h-6 ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
      </svg>
    </p>

    <!-- Search Bar -->
    <div class="max-w-2xl mx-auto mb-8">
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for positions, companies..."
        >
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <fwb-card v-for="job in filteredJobs"
                :key="job.id"
                class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
          <button class="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
            Apply Now
            <svg class="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
      </fwb-card>
    </div>

    <!-- Modal Component -->
    <Modal
      :isOpen="isModalOpen"
      :title="selectedJob?.name"
      :description="selectedJob?.position"
      :jobDescription="selectedJob?.description"
      @close="closeModal"
    />
  </section>
</template>

<script>
import Modal from '@/components/Modal.vue';
import jobData from '../data/jobData.json';
import companyData from '../data/companyData.json';

export default {
  name: 'CareerView',
  components: {
    Modal
  },
  data() {
    return {
      searchQuery: '',
      jobs: jobData,
      isModalOpen: false,
      selectedJob: null
    }
  },
  computed: {
    filteredJobs() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) return this.jobs;

      return this.jobs.filter(job => {
        return job.position.toLowerCase().includes(query) ||
               job.name.toLowerCase().includes(query) ||
               job.description.toLowerCase().includes(query);
      });
    }
  },
  methods: {
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
    }
  }
}
</script>
