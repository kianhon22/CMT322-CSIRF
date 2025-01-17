<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section v-if="isAuthenticated" class="bg-[url('/csirf-background.png')] bg-gray-500 bg-blend-multiply min-h-screen p-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Card -->
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-gray-200 pb-6">
          <div>
            <h1 class="text-3xl font-bold text-[#1E1B4B]">My Profile</h1>
          </div>
          <div class="flex gap-4">
            <button
              @click="logout"
              class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
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
            <button
              v-else
              @click="saveChanges"
              class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Save Changes
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

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Full Name</label>
                <input v-if="isEditing"
                       v-model="editedUser.name"
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                       placeholder="Enter your full name"
                />
                <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {{ user.name }}
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Email Address</label>
                <!-- <input v-if="isEditing"
                       v-model="editedUser.email"
                       type="email"
                       class="disabled w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                       placeholder="Enter your email"
                /> -->
                <div class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {{ user.email }}
                </div>
              </div>
            </div>
          </div>

          <!-- For Student -->
          <div class="space-y-6" v-if="user.role === 'student'">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    v-if="isEditing"
                    v-model="editedUser.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                    placeholder="Enter your phone number"
                  />
                  <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {{ user.phone }}
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Year</label>
                  <input
                    v-if="isEditing"
                    v-model="editedUser.year"
                    type="number"
                    min="1"
                    max="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent text-gray-900 font-medium"
                    placeholder="Enter your year"
                  />
                  <div v-else class="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {{ user.year }}
                  </div>
                </div>
              </div>

              <h2 class="text-xl font-semibold text-[#1E1B4B]">Resume</h2>
              <div class="flex justify-center items-center p-4 bg-gray-50 rounded-lg">
                <div v-if="isEditing" class="space-y-2 w-full">
                  <input
                    type="file"
                    @change="(e) => handleFileUpload(e, 'resume')"
                    accept=".pdf,.doc,.docx"
                    class="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1E1B4B] file:text-white hover:file:bg-[#312e81]"
                    :disabled="isUploading"
                  />
                  <!-- Upload Progress -->
                  <div v-if="isUploading" class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-[#1E1B4B] h-2.5 rounded-full transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                  <!-- Error Message -->
                  <p v-if="resumeError" class="text-sm text-red-500">{{ resumeError }}</p>
                  <!-- Current File Info -->
                  <p v-if="editedUser.resume" class="text-sm text-gray-900 font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Current file: {{ editedUser.resume.fileName }}
                  </p>
                </div>
                <div v-else class="px-3 py-2 bg-gray-50 rounded-lg w-full">
                  <a v-if="user.resume"
                     :href="user.resume.fileURL"
                     class="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                     target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Resume ({{ user.resume.fileName }})
                  </a>
                  <span v-else class="text-gray-500">No resume uploaded</span>
                </div>
              </div>
            </div>
          </div>

          <!--For Company -->
          <div v-if="user.role === 'company'" class="space-y-6">
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-[#1E1B4B]">Company Logo</h2>
              <div class="flex justify-center items-center p-4 bg-gray-50 rounded-lg">
                <img
                  :src="`/uploads/companyLogo/${user.logo}`"
                  alt="Company Logo"
                  class="max-w-[200px] max-h-[200px] object-contain"
                />
              </div>
              <div v-if="isEditing" class="space-y-2">
                <input
                  type="file"
                  @change="(e) => handleFileUpload(e, 'logo')"
                  accept="image/*"
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
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import toastr from 'toastr';

export default {
  data() {
    return {
      user: {},
      editedUser: {},
      isEditing: false,
      logoError: '',
      uploadProgress: 0,
      isUploading: false,
      resumeError: '',
    }
  },

  async created() {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          this.user = userDoc.data();
          this.editedUser = { ...this.user };
        }
      } else {
        this.$router.push('/login');
      }
    });
  },

  methods: {
    startEditing() {
      this.isEditing = true;
    },
    async handleFileUpload(event, type) {
      const file = event.target.files[0];
      if (!file) return;

      if (type === 'resume') {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          this.resumeError = 'Please upload a valid document (PDF, DOC, or DOCX)';
          return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          this.resumeError = 'File size should not exceed 5MB';
          return;
        }

        this.isUploading = true;
        this.uploadProgress = 0;
        this.resumeError = '';

        try {
          const storage = getStorage();
          const fileExtension = file.name.split('.').pop();
          const fileName = `${auth.currentUser.uid}_${Date.now()}.${fileExtension}`;
          const resumeRef = storageRef(storage, `resumes/${fileName}`);

          // Upload file with progress tracking
          const uploadTask = uploadBytesResumable(resumeRef, file);

          uploadTask.on('state_changed',
            (snapshot) => {
              // Track upload progress
              this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              // Handle upload error
              console.error('Upload error:', error);
              this.resumeError = 'Failed to upload resume. Please try again.';
              this.isUploading = false;
            },
            async () => {
              // Upload completed successfully
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              this.editedUser.resume = {
                fileName: file.name,
                fileURL: downloadURL,
                uploadedAt: new Date().toISOString()
              };
              this.isUploading = false;
              toastr.success('Resume uploaded successfully!');
            }
          );
        } catch (error) {
          console.error('Resume upload error:', error);
          this.resumeError = 'Failed to upload resume. Please try again.';
          this.isUploading = false;
        }
      } else if (type === 'logo') {
        // Existing logo upload logic
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          this.logoError = 'Please upload a valid image file (PNG, JPEG, JPG)';
          return;
        }
        const fileName = file.name;
        this.editedUser.logo = fileName;
      }
    },
    async saveChanges() {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, this.editedUser);
        this.user = { ...this.editedUser };
        this.isEditing = false;
        toastr.success('Profile updated successfully!');
      }
      catch (error) {
        console.error('Profile update error:', error);
        toastr.error('Failed to update profile. Please try again.');
      }
    },
    async logout() {
      await signOut(auth);
      this.$router.push('/login');
    },
  },
  computed: {
    isAuthenticated() {
      return this.user !== null;
    },
  },
}
</script>

<style scoped>
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
