<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Background Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50" @click.self="close"></div>

      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <!-- Close Button -->
            <div class="absolute right-4 top-4">
              <button @click="close"
                      class="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors duration-200">
                <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-2xl font-semibold leading-6 text-gray-900 mb-4 pr-8">
                {{ title }}
              </h3>
              <div class="mt-4">
                <p class="text-gray-700 whitespace-pre-line">
                  {{ description }}
                </p>
                <!-- Job Description -->
                <p class="mt-2 text-gray-600">
                  {{ jobDescription }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    title: String,
    description: String,
    jobDescription: String
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
