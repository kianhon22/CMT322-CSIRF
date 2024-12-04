<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-1/2 p-6 relative">
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          @click="closePopup"
        >
          X
        </button>
        <!-- Content -->
        <div v-if="popupContent">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-4">
            {{ popupContent.title }}
          </h2>
          <img
            :src="popupContent.image"
            alt="Popup Image"
            class="mb-4 rounded-lg w-full h-64 object-cover"
          />
        <!-- Scrollable Content -->
        <div class="popup-content max-h-80 overflow-y-auto pr-4">
            <p class="text-gray-700 mb-6" v-html= "popupContent.content"></p>
        </div>
          <!-- Register Button -->
          <button
            v-if="popupContent.badgeText === 'Event'"
            class="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
          >
            Register Now
          </button>
        </div>
        <div v-else>
          <p class="text-gray-500 text-center">Loading content...</p>
        </div>
      </div>
    </div>
  </template>

  <script>
  import announcementData from "@/data/announcementData.json"; // Ensure this path is correct

  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      popupId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        popupContent: null,
      };
    },
    watch: {
      popupId: {
        immediate: true,
        handler(newId) {
          // Ensure popupId is valid and fetch content
          if (newId && announcementData[newId - 1]) {
            this.popupContent = {
            ...announcementData[newId - 1],
            image: new URL(
            `../assets/${announcementData[newId - 1].image}`,
            import.meta.url
            ).href,
        };
} else {
  console.error("Invalid popupId:", newId);
  this.popupContent = null;
}
        },
      },
    },
    methods: {
      closePopup() {
        this.$emit("close");
      },
    },
  };
  </script>

  <style scoped>
  /* Add necessary styling for the popup */
  </style>
