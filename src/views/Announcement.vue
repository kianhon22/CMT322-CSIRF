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
      <div class="mb-4 max-w-xl mx-auto flex items-center gap-2">
        <input
          type="text"
          v-model="searchInput"
          placeholder="Search events or articles..."
          class="w-full p-2.5 rounded-lg bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
        />

        <button class="px-3 py-[11px] rounded-lg backdrop-blur-sm bg-white hover:bg-orange-500 text-gray-900 font-medium cursor-pointer"
          @click="refresh">Refresh
        </button>
      </div>

      <!-- Filter -->
      <div class="flex justify-center">
        <select
          v-model="selectedType"
          class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white/95 backdrop-blur-sm focus:ring-2 text-gray-900 font-medium cursor-pointer"
        >
          <option value="" disabled>Type</option>
          <option value="event">Event</option>
          <option value="company">Company</option>
          <option value="internship">Internship</option>
        </select>
      </div>
    </div>

    <!-- Container for cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
      <div
        v-for="(event, index) in filteredEvents"
        :key="index"
        class="flex bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        @click="openPopup(event.id)"
      >
        <!-- Image Section -->
        <div class="w-1/3">
          <img
            :src="event.image"
            :alt="event.title"
            class="h-full w-full object-cover rounded-l-xl"
          />
        </div>
        <!-- Content Section -->
        <div class="flex flex-col justify-between w-2/3 p-6">
          <div>
            <h5 class="text-xl font-bold tracking-tight text-gray-900 mb-2">
              {{ event.title }}
            </h5>
            <p class="text-gray-700">
              {{ event.description }}
            </p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span :class="['badge', badgeColor(event.type)]">
              {{ capitalWords(event.type) }}
            </span>
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-500 rounded-lg hover:bg-orange-200 focus:ring-4 focus:ring-orange-300 transition-colors duration-300"
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
      :popupId="selectedPopupId || ''"
      @close="closePopup"
    />
  </section>
</template>


<script>
import PopUp from "@/components/PopUp.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "Announcement",
  components: {
    PopUp,
  },
  data() {
    return {
      events: [],
      isPopupVisible: false, // Controls popup visibility
      selectedPopupId: null, // Holds the ID for the selected popup
      searchInput: '', // Holds the search query
      selectedType: '', // Holds the selected badge text
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter((event) => {
        const titleMatch = event.title.toLowerCase().includes(this.searchInput.toLowerCase());
        const typeMatch = this.selectedType === "" || event.type === this.selectedType;
        return titleMatch && typeMatch;
      });
    },
  },
  methods: {
    openPopup(id) {
      this.selectedPopupId = id; // Set the selected popup ID
      this.isPopupVisible = true; // Show the popup
    },
    closePopup() {
      this.isPopupVisible = false; // Hide the popup
      this.selectedPopupId = null; // Clear the selected popup ID
    },
    badgeColor(type) {
      switch (type) {
        case "event":
          return "bg-blue-500 text-white";
        case "company":
          return "bg-green-500 text-white";
        case "internship":
          return "bg-red-500 text-white";
        default:
          return "bg-gray-500 text-white";
      }
    },
    async fetchEvents() {
      const querySnapshot = await getDocs(collection(db, "events"));
      this.events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        image: new URL(`../assets/${doc.data().image}`, import.meta.url).href, // Update image path
      }));
    },
    refresh() {
      this.searchInput = '';
      this.selectedType = '';
    },
    capitalWords(text) {
      if (!text) 
        return "";
      return text
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
  },
  async mounted() {
    await this.fetchEvents();
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
