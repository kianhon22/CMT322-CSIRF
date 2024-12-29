<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-lg w-full md:w-4/5 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
        <!-- Close Button -->
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition duration-300"
          @click="closePopup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Content -->
        <div v-if="popupContent" class="space-y-4">
          <h2 class="text-2xl font-bold text-[#1E1B4B] pr-8">
            {{ popupContent.title }}
          </h2>
          <img
            :src="popupContent.image"
            alt="Popup Image"
            class="rounded-lg w-full h-48 md:h-64 object-cover"
          />
          <!-- Scrollable Content -->
          <div class="popup-content pr-4">
            <p class="text-gray-700" v-html="popupContent.content"></p>
          </div>
          <!-- Register Button -->
          <button
            v-if="popupContent.badgeText === 'Event'"
            @click.prevent="openModal"
            class="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
          >
            Register Here
          </button>
        </div>
        <div v-else>
          <p class="text-gray-500 text-center">Loading content...</p>
        </div>
      </div>
    </div>
                  <!-- Dynamic Modal -->
                  <Modal
          v-model:show="isModalVisible"
          :title="modalTitle"
          :text="modalText"
          :color="modalColor"
        >
          <template #actions>
            <button
              @click.prevent="isModalVisible = false"
              class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              @click.prevent="currentUser != null ? registerEvent() : $router.push('/login')"
              class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              {{currentUser != null ? 'Confirm' : 'Log In'}}
            </button>
          </template>
        </Modal>
  </template>

  <script>
  import announcementData from "@/data/announcementData.json"; // Ensure this path is correct
  import Modal from "@/components/Modal.vue";
  import { inject } from 'vue';

  export default {
    setup() {
    const currentUser = inject('currentUser')
    return { currentUser }
  },
    components: {
      Modal,
    },
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

        isModalVisible: false, // Modal visibility
        modalTitle: "",
        modalText: "",
        modalColor: "white", // Color of the modal
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

      openModal() {
      if (this.isUserLoggedIn()) {
        this.modalTitle = "RSVP Now";
        this.modalText = "Confirm to join the event?";
        this.modalColor = "black";
        this.isModalVisible = true;
      }
      else {
        this.modalTitle = "Login Required";
        this.modalText = "Please log in to register for the event";
        this.modalColor = "black";
        this.isModalVisible = true;
      }
    },
    isUserLoggedIn() {
      if (this.currentUser != null)
        return true;
      else
        return false;
    },
    registerEvent() {
      toastr.success('You have registered the event!', 'Success');
      this.isModalVisible = false;
      this.$emit("close");
    },
    },
  };
  </script>
