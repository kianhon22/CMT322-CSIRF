<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="bg-[#1E1B4B] min-h-screen p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-[#1E1B4B]">Profile</h1>
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </button>
        <div v-else class="space-x-2">
          <button
            @click="saveChanges"
            class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
          <button
            @click="cancelEditing"
            class="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Name field -->
        <div class="flex items-center space-x-4">
          <span class="font-semibold w-24 text-gray-700">Name:</span>
          <input v-if="isEditing"
                 v-model="editedUser.name"
                 class="text-gray-900 border rounded px-2 py-1 w-64"
          />
          <span v-else class="text-gray-900">{{ currentUser.name }}</span>
        </div>

        <!-- Email field -->
        <div class="flex items-center space-x-4">
          <span class="font-semibold w-24 text-gray-700">Email:</span>
          <input v-if="isEditing"
                 v-model="editedUser.email"
                 type="email"
                 class="text-gray-900 border rounded px-2 py-1 w-64"
          />
          <span v-else class="text-gray-900">{{ currentUser.email }}</span>
        </div>

        <!-- Role field (read-only) -->
        <div class="flex items-center space-x-4">
          <span class="font-semibold w-24 text-gray-700">Role:</span>
          <span class="capitalize text-gray-900">{{ currentUser.role }}</span>
        </div>

        <!-- Student-specific fields -->
        <div v-if="currentUser.role === 'student'" class="space-y-4">
          <!-- Phone field -->
          <div class="flex items-center space-x-4">
            <span class="font-semibold w-24 text-gray-700">Phone:</span>
            <input v-if="isEditing"
                   v-model="editedUser.phone"
                   class="text-gray-900 border rounded px-2 py-1 w-64"
            />
            <span v-else class="text-gray-900">{{ currentUser.phone }}</span>
          </div>

          <!-- Year field -->
          <div class="flex items-center space-x-4">
            <span class="font-semibold w-24 text-gray-700">Year:</span>
            <select v-if="isEditing"
                    v-model="editedUser.year"
                    class="text-gray-900 border rounded px-2 py-1 w-64">
              <option v-for="year in [1,2,3,4]" :key="year" :value="year">
                Year {{ year }}
              </option>
            </select>
            <span v-else class="text-gray-900">Year {{ currentUser.year }}</span>
          </div>

          <!-- Resume field -->
          <div class="flex items-center space-x-4">
            <span class="font-semibold w-24 text-gray-700">Resume:</span>
            <div v-if="isEditing" class="flex flex-col space-y-2">
              <input
                type="file"
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx"
                class="text-gray-900"
              />
              <span v-if="currentUser.resume" class="text-sm text-gray-600">
                Current file: {{ currentUser.resume }}
              </span>
            </div>
            <div v-else>
              <a v-if="currentUser.resume"
                 :href="`/resume/${currentUser.resume}`"
                 class="text-blue-600 hover:text-blue-800 hover:underline"
                 target="_blank">
                View Resume
              </a>
              <span v-else class="text-gray-500">No resume uploaded</span>
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
      newResumeFile: null
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

    saveChanges() {
      try {
        // Handle resume file if changed
        if (this.newResumeFile) {
          const fileURL = URL.createObjectURL(this.newResumeFile);
          localStorage.setItem(`resume_${this.editedUser.resume}`, fileURL);
        }

        // Update currentUser
        Object.assign(this.currentUser, this.editedUser);

        // Update userData
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
