<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="bg-gradient-to-br from-[#1E1B4B] to-[#312e81] min-h-screen p-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Card -->
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-gray-200 pb-6">
          <div>
            <h1 class="text-3xl font-bold text-[#1E1B4B]">My Profile</h1>
          </div>
          <button
            v-if="!isEditing"
            @click="startEditing"
            class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#1E1B4B] rounded-lg hover:bg-[#312e81] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
          <div v-else class="space-x-3">
            <button
              @click="saveChanges"
              class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Save
            </button>
            <button
              @click="cancelEditing"
              class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- Basic Information Section -->
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-[#1E1B4B]">Basic Information</h2>

              <!-- Name field -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Full Name</label>
                <input v-if="isEditing"
                       v-model="editedUser.name"
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                       placeholder="Enter your full name"
                />
                <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {{ currentUser.name }}
                </div>
              </div>

              <!-- Email field -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Email Address</label>
                <input v-if="isEditing"
                       v-model="editedUser.email"
                       type="email"
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                       placeholder="Enter your email"
                />
                <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {{ currentUser.email }}
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6" v-if="currentUser.role === 'student'">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    v-if="isEditing"
                    v-model="phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                    placeholder="Enter your phone number"
                  />
                  <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {{ phone }}
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Year</label>
                  <input
                    v-if="isEditing"
                    v-model="year"
                    type="number"
                    min="1"
                    max="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                    placeholder="Enter your year"
                  />
                  <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {{ year }}
                  </div>
                </div>
              </div>

              <h2 class="text-xl font-semibold text-[#1E1B4B]">Resume</h2>
              <div class="flex justify-center items-center p-4 bg-gray-50 rounded-lg">
                <div v-if="isEditing" class="space-y-2">
                  <input
                    type="file"
                    @change="handleFileUpload"
                    accept=".pdf,.doc,.docx"
                    class="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1E1B4B] file:text-white hover:file:bg-[#312e81]"
                  />
                  <p v-if="currentUser.resume" class="text-sm text-gray-900 font-medium">
                    Current file: {{ currentUser.resume }}
                  </p>
                </div>
                <div v-else class="px-3 py-2 bg-gray-50 rounded-lg">
                  <a v-if="currentUser.resume"
                     :href="`/resume/${currentUser.resume}`"
                     class="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                     target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Resume
                  </a>
                  <span v-else class="text-gray-500">No resume uploaded</span>
                </div>
              </div>
            </div>
          </div>

          <!--sponsor section -->
          <div class="space-y-6" v-if="currentUser.role === 'sponsor'">
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-[#1E1B4B]">Company Logo</h2>
              <div class="flex justify-center items-center p-4 bg-gray-50 rounded-lg">
                <img
                  :src="newLogoURL || currentUser.logo"
                  :alt="currentUser.name"
                  class="max-w-[200px] max-h-[200px] object-contain"
                />
              </div>
              <div v-if="isEditing" class="space-y-2">
                <input
                  type="file"
                  @change="handleLogoUpload"
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  class="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1E1B4B] file:text-white hover:file:bg-[#312e81]"
                />
                <p v-if="logoError" class="text-red-500 text-sm mt-1">{{ logoError }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import userData from '../data/userData.json';

export default {
  setup() {
    const currentUser = inject('currentUser')
    return { currentUser }
  },

  data() {
    return {
      isEditing: false,
      editedUser: {},
      phone: this.currentUser.phone || '',
      year: this.currentUser.year || '',
      newResumeFile: null,
      newLogoURL: null,
      logoError: ''
    }
  },

  methods: {
    startEditing() {
      this.editedUser = { ...this.currentUser };
      this.isEditing = true;
    },

    cancelEditing() {
      this.isEditing = false;
      this.editedUser = {};
      this.newResumeFile = null;
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!allowedTypes.includes(fileExtension)) {
          alert('Please upload a PDF or Word document');
          return;
        }

        this.newResumeFile = file;
        this.editedUser.resume = `student${this.currentUser.id}_resume${fileExtension}`;
      }
    },

    handleLogoUpload(event) {
      const file = event.target.files[0];
      this.logoError = '';

      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          this.logoError = 'Please upload a valid image file (PNG, JPEG, JPG, or GIF)';
          event.target.value = '';
          return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          this.logoError = 'File size should not exceed 5MB';
          event.target.value = '';
          return;
        }

        const fileURL = URL.createObjectURL(file);
        this.newLogoURL = fileURL;
        this.editedUser.logo = fileURL;
      }
    },

    saveChanges() {
      try {
        if (this.newResumeFile) {
          const fileURL = URL.createObjectURL(this.newResumeFile);
          localStorage.setItem(`resume_${this.editedUser.resume}`, fileURL);
        }

        Object.assign(this.currentUser, this.editedUser);

        const studentIndex = userData.student.findIndex(s => s.id === this.currentUser.id);
        if (studentIndex !== -1) {
          userData.student[studentIndex] = { ...this.currentUser };
        }

        this.isEditing = false;
        this.newResumeFile = null;
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  }
}
</script>

<style scoped>
/* Optional: Add smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
