<template>
  <section class="min-h-screen bg-center bg-no-repeat bg-[url('/src/assets/neon-purple-modern-city-iegjsguqr41ak8ee.jpg')] bg-gray-500 bg-blend-multiply p-8">
    <h1 class="text-4xl font-bold text-center mb-12 text-white">Career Opportunities</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <fwb-card v-for="job in jobs"
                :key="job.id"
                class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div class="p-6">
          <h5 class="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            {{ job.company }}
          </h5>
          <p class="mb-5 font-normal text-gray-700">
            {{ job.position }}
          </p>
          <button class="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
            Apply Now
            <svg class="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
      </fwb-card>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CareerView',
  data() {
    return {
      jobs: [
        {
          id: 1,
          company: 'TechCorp Solutions',
          position: 'Senior Frontend Developer'
        },
        {
          id: 2,
          company: 'DataFlow Systems',
          position: 'Machine Learning Engineer'
        },
        {
          id: 3,
          company: 'CloudNine Technologies',
          position: 'DevOps Specialist'
        },
        {
          id: 4,
          company: 'Quantum Innovations',
          position: 'Full Stack Developer'
        },
        {
          id: 5,
          company: 'CyberGuard Security',
          position: 'Security Engineer'
        }
      ]
    }
  }
}
</script>
