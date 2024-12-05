<template>
  <section class="min-h-screen bg-center bg-cover bg-[url('/csirf-background.png')] bg-gray-500 bg-blend-multiply p-8">
    <h1 class="text-5xl font-bold text-center mt-3 mb-4 text-white">
      Exciting Things Are Happening!
    </h1>
    <p class="text text-center mb-8 text-orange-500 flex justify-center items-center gap-2">
      Click on the announcement for more details!
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-pulse">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
      </svg>
    </p>

    <!-- Search and Filters -->
    <div class="max-w-4xl mx-auto px-4 mb-8">
      <!-- Search Bar -->
      <div class="mb-4 max-w-xl mx-auto">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search announcements..."
          class="w-full p-2.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
        />
      </div>

      <!-- Filter -->
      <div class="flex justify-center">
        <select
          v-model="selectedBadge"
          class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium cursor-pointer"
        >
          <option value="">Type: All</option>
          <option value="Event">Event</option>
          <option value="Company">Company</option>
          <option value="Intern">Intern</option>
        </select>
      </div>
    </div>

    <!-- Container for cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
      <div
        v-for="(item, index) in filteredAnnouncements"
        :key="index"
        class="flex bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        @click="openPopup(index + 1)"
      >
        <!-- Image Section -->
        <div class="w-1/3">
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover rounded-l-xl"
          />
        </div>
        <!-- Content Section -->
        <div class="flex flex-col justify-between w-2/3 p-6">
          <div>
            <h5 class="text-xl font-bold tracking-tight text-gray-900 mb-2">
              {{ item.title }}
            </h5>
            <p class="text-gray-700">
              {{ item.description }}
            </p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span :class="['badge', badgeClass(item.badgeText)]">
              {{ item.badgeText }}
            </span>
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
            >
              Read More
              <svg class="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
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
      searchQuery: "", // Holds the search query
      selectedBadge: "", // Holds the selected badge text
    };
  },
  computed: {
    filteredAnnouncements() {
      return this.announcement.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const badgeMatch = this.selectedBadge === "" || item.badgeText === this.selectedBadge;
        return titleMatch && badgeMatch;
      });
    },
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
