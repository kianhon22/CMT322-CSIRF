<template>
  <section class="min-h-screen bg-center bg-cover bg-no-repeat bg-[url('/csirf-background.png')] bg-gray-500 bg-blend-multiply p-8">
    <h1 class="text-5xl font-bold text-center mt-3 mb-4 text-white">Career Opportunities</h1>
    <p class="text text-center mb-8 text-orange-500 flex justify-center items-center gap-2">      Click on the job for more details!
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-pulse">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
      </svg>
    </p>

    <!-- Search and Filters -->
    <div class="max-w-4xl mx-auto px-4 mb-8">
      <!-- Search Bar -->
      <div class="mb-4 max-w-xl mx-auto flex items-center gap-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for jobs..."
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
        />

        <button class="px-3 py-[11px] rounded-lg backdrop-blur-sm bg-white hover:bg-orange-500 text-gray-900 font-medium cursor-pointer"
          @click="refresh">Refresh
        </button>
      </div>

      <!-- Filters -->
      <div class="flex justify-center gap-4">
        <!-- Job Type Filter -->
        <select
          v-model="selectedType"
          class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium cursor-pointer"
        >
          <option value="" disabled>Type</option>
          <option value="Internship">Internship</option>
          <option value="Full-Time">Full-Time</option>
        </select>

        <!-- Job Mode Filter -->
        <select
          v-model="selectedMode"
          class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium cursor-pointer"
        >
          <option value="" disabled>Mode</option>
          <option value="On-Site">On-Site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <!-- Location Filter -->
        <select
          v-model="selectedLocation"
          class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium cursor-pointer"
        >
          <option value="" disabled>Location</option>
          <optgroup label="Malaysia">
            <option value="Johor">Johor</option>
            <option value="Kedah">Kedah</option>
            <option value="Kelantan">Kelantan</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Melaka">Melaka</option>
            <option value="Negeri Sembilan">Negeri Sembilan</option>
            <option value="Pahang">Pahang</option>
            <option value="Penang">Penang</option>
            <option value="Perak">Perak</option>
            <option value="Perlis">Perlis</option>
            <option value="Sabah">Sabah</option>
            <option value="Sarawak">Sarawak</option>
            <option value="Selangor">Selangor</option>
            <option value="Terengganu">Terengganu</option>
          </optgroup>
          <optgroup label="Singapore">
            <option value="Singapore">Singapore</option>
          </optgroup>
        </select>
      </div>
    </div>

    <!-- Container for cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      <!-- Loading state -->
      <div v-if="isLoading" class="col-span-3 text-center py-8">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"></div>
        <p class="mt-2 text-white">Loading jobs...</p>
      </div>

      <!-- No jobs found -->
      <div v-else-if="filteredJobs.length === 0" class="col-span-3 text-center py-8">
        <p class="text-white text-lg">No jobs found matching your criteria.</p>
      </div>

      <!-- Job cards -->
      <fwb-card v-else v-for="job in filteredJobs"
        :key="job.id"
        class="bg-white backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-sm"
        @click="openModal(job)">
        <!-- Card content -->
        <div class="p-4 flex flex-col justify-between h-full">
          <div>
            <!-- Top section with logo and position -->
            <div class="relative">
              <!-- Logo positioned absolutely -->
              <div class="absolute top-0 left-0">
                <img
                  v-if="job.companyLogo"
                  :src="job.companyLogo"
                  :alt="job.companyName"
                  class="w-14 h-14 object-contain rounded-lg"
                  @error="$event.target.style.display='none'"
                />
                <div v-else class="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span class="text-xl font-bold text-gray-500">{{ job.companyName ? job.companyName.charAt(0) : '?' }}</span>
                </div>
              </div>

              <!-- Position, company name, and location with consistent left padding -->
              <div class="pl-[68px]">
                <h5 class="text-xl font-bold tracking-tight text-gray-900 line-clamp-2 mb-1">
                  {{ job.position }}
                </h5>
                <p class="font-normal text-gray-700">
                  {{ job.companyName }}
                </p>
                <p class="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {{ job.companyLocation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bottom section with tags and button -->
          <div class="mt-4">
            <div class="flex justify-start gap-2 mb-3">
              <span class="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                {{ job.type }}
              </span>
              <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                {{ job.mode }}
              </span>
            </div>
            <button class="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-[#1E1B4B] rounded-lg hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
              Apply Now
              <svg class="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
          </div>
        </div>
      </fwb-card>
    </div>

    <!-- Modal Component -->
    <Modal
    :isOpen="isModalOpen"
    :jobId="selectedJob|| ''"
    :title="selectedJob?.position"
    :description="selectedJob?.position"
    :jobDescription="selectedJob?.description"
    :companyId="selectedJob?.companyID"
    :showCompanyDetails="true"
    @close="closeModal"
    />
  </section>
</template>

<script>
import Modal from '@/components/JobModal.vue';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase';

export default {
  name: 'CareerView',
  components: {
    Modal
  },
  data() {
    return {
      searchQuery: '',
      selectedType: '',
      selectedMode: '',
      selectedLocation: '',
      jobs: [],
      isModalOpen: false,
      selectedJob: null,
      isLoading: true
    }
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job => {
        const matchesSearch = job.position.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            job.companyName?.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesType = !this.selectedType || job.type === this.selectedType;

        const matchesMode = !this.selectedMode || job.mode === this.selectedMode;

        const companyLocation = job.companyLocation;
        const matchesLocation = !this.selectedLocation ||
                              (companyLocation && companyLocation.includes(this.selectedLocation));

        return matchesSearch && matchesType && matchesMode && matchesLocation;
      });
    }
  },
  methods: {
    async fetchJobs() {
      this.isLoading = true;
      try {
        const jobsRef = collection(db, 'jobs');
        const snapshot = await getDocs(jobsRef);

        // Fetch jobs and company details
        const jobsPromises = snapshot.docs.map(async (jobDoc) => {
          const jobData = jobDoc.data();

          // Fetch company details
          if (jobData.companyID) {
            const companyRef = doc(db, 'companies', jobData.companyID);
            const companyDoc = await getDoc(companyRef);
            if (companyDoc.exists()) {
              const companyData = companyDoc.data();

              // Fetch the logo URL if available
              let logoUrl = null;
              if (companyData.logo) {
                try {
                  const storage = getStorage();
                  const logoRef = ref(storage, `companies logo${companyData.logo}`);
                  logoUrl = await getDownloadURL(logoRef);
                } catch (error) {
                  console.error("Error fetching logo:", error);
                }
              }

              return {
                id: jobDoc.id,
                ...jobData,
                companyName: companyData.name,
                companyLocation: companyData.location,
                companyLogo: logoUrl
              };
            }
          }
          return {
            id: jobDoc.id,
            ...jobData
          };
        });

        this.jobs = await Promise.all(jobsPromises);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        this.isLoading = false;
      }
    },
    openModal(job) {
      this.selectedJob = job;
      console.log("selectedjob:",this.selectedJob);
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedJob = null;
    },
    refresh() {
      this.searchQuery = '';
      this.selectedType = '';
      this.selectedMode = '';
      this.selectedLocation = '';
      this.fetchJobs();
    }
  },
  async mounted() {
    await this.fetchJobs();
  }
}
</script>
