<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
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
        <div v-if="event" class="space-y-4">
          <h2 class="text-2xl font-bold text-[#1E1B4B] pr-8">
            {{ event.title }}
          </h2>
          <img
            :src="event.image"
            alt="Event Image"
            class="rounded-lg w-full h-48 md:h-64 object-cover"
          />
          <!-- Scrollable Content -->
          <div class="popup-content pr-4">
            <p class="text-gray-700" v-html="event.content"></p>
          </div>
          <!-- Register Button -->
          <button
            v-if="(event.type === 'event') && (user == null || (user.role == 'student')) && !registeredCourse"
            @click.prevent="openModal"
            class="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
          >
            Register Here
          </button>
          <button
            v-if="registeredCourse" disabled
            class="mt-4 px-6 py-2 bg-orange-500 text-white opacity-80 font-bold rounded-lg cursor-not-allowed"
          >
            See You There!
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
          @click.prevent="user ? registerEvent() : $router.push('/login')"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          {{ user ? 'Confirm' : 'Log In' }}
        </button>
      </template>
    </Modal>
  </template>

  <script>
  import Modal from "@/components/Modal.vue";
  import { auth, db } from '@/firebase';
  import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

  export default {
    components: {
      Modal,
    },
    emits: ["close"],
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      popupId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        user: null,
        event: null,
        registeredCourse: false,
        isModalVisible: false,
        modalTitle: "",
        modalText: "",
        modalColor: "white",
      };
    },
    watch: {
      popupId: {
        immediate: true,
        async handler(id) {
          if (id) {
            const eventDoc = await getDoc(doc(db, "events", id));
            if (eventDoc.exists()) {
              this.event = {
                ...eventDoc.data(),
                image: new URL(`../assets/${eventDoc.data().image}`, import.meta.url).href,
              };
              // Check if the user has registered for this event
              this.checkRegisteredCourse();
            } 
            else {
              this.event = null;
            }
          }
        },
      },
    },
    methods: {
      closePopup() {
        this.$emit("close");
      },
      openModal() {
        if (this.user) {
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
      async registerEvent() {
        if (!this.user || !this.event)
          return;

        try {
          // Update the user's registeredEvents array
          const userRef = doc(db, "users", this.user.id);
          await updateDoc(userRef, {
            registeredEvents: arrayUnion(this.popupId),
          });

          // Update the event's registeredStudents array
          const eventRef = doc(db, "events", this.popupId);
          await updateDoc(eventRef, {
            registeredStudents: arrayUnion(this.user.id),
          });

          toastr.success("You have registered for the event!", "Success");
        } catch (error) {
          toastr.error("Failed to register for the event. Please try again.", "Error");
        } finally {
          this.isModalVisible = false;
          this.$emit("close");
        }
      },
      async checkRegisteredCourse() {
        if (this.user && this.user.registeredEvents) {
          this.registeredCourse = this.user.registeredEvents.includes(this.popupId);
        } else {
          this.registeredCourse = false;
        }
      },
    },
    async mounted() {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          this.user = {
            id: userDoc.id,
            ...userDoc.data(),
          };
        }
      }
    },
  };
  </script>
