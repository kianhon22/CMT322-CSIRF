<template>
    <section class="min-h-screen bg-center bg-no-repeat bg-[url('@/assets/neon-purple-modern-city-iegjsguqr41ak8ee.jpg')] bg-gray-500 bg-blend-multiply p-8">
      <h1 class="text-5xl font-bold text-center mt-3 mb-14 text-white">
        Exciting Things Are Happening!
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card -->
        <div
          v-for="(item, index) in announcement"
          :key="index"
          class="flex bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <!-- Image Section -->
          <div class="w-1/3">
            <img
              :src="item.image"
              :alt="item.title"
              class="object-cover w-full h-full rounded-l-lg"
            />
          </div>
          <!-- Content Section -->
          <div class="flex flex-col justify-between w-2/3 p-4">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#1E1B4B] dark:text-white">
              {{ item.title }}
            </h5>
            <p class="mb-4 font-normal text-[#1E1B4B] dark:text-gray-400">
              {{ item.description }}
            </p>
            <div class="flex justify-between items-center">
                <!-- Badge -->
                <span :class="['badge', badgeClass(item.badgeText)]">
                    {{ item.badgeText }}
                </span>
              <button
                class="mt-auto px-4 py-2 text-orange-500 rounded-lg font-normal text-sm flex items-center"
                @click="openPopup(index + 1)"
              >
                Read More
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Popup Modal -->
      <PopUp
        :isVisible="isPopupVisible"
        :popupId="selectedPopupId"
        @close="closePopup"
      />
    </section>
  </template>
  

<script>
import announcementData from "@/data/announcementData.json";
import PopUp from "@/components/PopUp.vue";

export default {
  name: "Announcement",
  components: {
    PopUp,
  },
  data() {
    return {
      announcement: announcementData.map((item) => ({
        ...item,
        image: new URL(`../assets/${item.image}`, import.meta.url).href,
      })),
      isPopupVisible: false, // Controls popup visibility
      selectedPopupId: null, // Holds the ID for the selected popup
    };
  },
  methods: {
    openPopup(index) {
      this.selectedPopupId = index; // Set the selected popup ID
      this.isPopupVisible = true; // Show the popup
    },
    closePopup() {
      this.isPopupVisible = false; // Hide the popup
      this.selectedPopupId = null; // Clear the selected popup ID
    },
    badgeClass(badgeText) {
      switch (badgeText) {
        case "Event":
          return "bg-blue-500 text-white";
        case "Company":
          return "bg-green-500 text-white";
        case "Intern":
          return "bg-red-500 text-white";
        default:
          return "bg-gray-500 text-white";
      }
    },
  },
};
</script>

<style scoped>
/* Ensure a fixed height for images in the cards */
img {
  height: 100%;
  object-fit: cover; /* Keeps the aspect ratio without distortion */
}

/* Badge Base Styling */
.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
</style>
