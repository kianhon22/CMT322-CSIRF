<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Transition name="modal-fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-screen items-center justify-center p-4">
                <div class="fixed inset-0 bg-black opacity-30"></div>
                <div class="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
                    <!-- Header with close button -->
                    <div class="mb-6 flex items-start justify-between">
                        <h3 class="text-2xl font-semibold text-gray-900">
                            {{ title }}
                        </h3>
                        <button @click="close" class="text-gray-400 hover:text-gray-500">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="mt-4">
                        <div class="text-gray-600 whitespace-pre-line">
                            <div v-for="(section, index) in formattedDescription" :key="index">
                                <p class="font-bold text-gray-800 mb-2">{{ section.title }}</p>
                                <ul class="list-disc pl-6 mb-4">
                                    <li v-for="(item, idx) in section.items" :key="idx" class="mb-1">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- New Footer with centered buttons -->
                    <div class="mt-8 flex justify-center space-x-4">
                        <button
                            v-if="showCompanyDetails"
                            @click="viewCompany"
                            class="px-6 py-2.5 text-sm font-medium text-white bg-[#1E1B4B] rounded-lg hover:bg-white hover:text-[#1E1B4B] border border-[#1E1B4B]"
                        >
                            Company Details
                        </button>
                        <button
                            @click="applyJob"
                            @click.prevent="openModal"
                            :disabled="isApplied"
                            :class="[
                                'px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors duration-300',
                                isApplied
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-orange-500 text-white hover:bg-white hover:text-orange-500 hover:border-orange-500'
                            ]"
                        >
                            {{ isApplied ? 'Applied' : 'Apply' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
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
              @click.prevent="currentUser != null ? applyJobs() : $router.push('/login')"
              class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              {{currentUser != null ? 'Confirm' : 'Log In'}}
            </button>
          </template>
        </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import toastr from 'toastr';

export default {
    components: {
        Modal,
    },
    props: {
        isOpen: Boolean,
        jobId: String,
        title: String,
        description: String,
        jobDescription: String,
        companyId: Number,
        showCompanyDetails: {
            type: Boolean,
            default: false,
        },
        isApplied: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isModalVisible: false,
            modalTitle: "",
            modalText: "",
            modalColor: "white",
            currentUser: null,
        };
    },
    async mounted() {
        if (auth.currentUser) {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userDoc.exists()) {
                this.currentUser = {
                    id: userDoc.id,
                    ...userDoc.data(),
                };
            }
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        viewCompany() {
            if (this.companyId) {
                this.$router.push({ name: 'Company', params: { id: this.companyId } });
                this.close();
            }
        },
        applyJob() {
            // Handle job application
            this.$emit("apply");
        },

        openModal() {
            if (!this.isApplied) {
                if (this.isUserLoggedIn()) {
                    this.modalTitle = "Apply Now";
                    this.modalText = "Confirm to apply this job?";
                    this.modalColor = "black";
                    this.isModalVisible = true;
                }
                else {
                    this.modalTitle = "Login Required";
                    this.modalText = "Please log in to apply for the job";
                    this.modalColor = "black";
                    this.isModalVisible = true;
                }
            }
        },
    isUserLoggedIn() {
      if (this.currentUser != null)
        return true;
      else
        return false;
    },

async applyJobs() {
  console.log("currentUser:", this.currentUser); // Logs the current user object
  console.log("job:", this.jobId);
  if (!this.currentUser || !this.title) {
    return;
  }

  try {
    const userRef = doc(db, "users", this.currentUser.id);
    const jobRef = doc(db, "jobs", this.jobId.id);

    await updateDoc(userRef, {
      appliedJobs: arrayUnion(this.jobId.id),
    });

    // Ensure job's appliedStudents field is initialized as an array
    const jobDoc = await getDoc(jobRef);
    if (!jobDoc.exists() || !Array.isArray(jobDoc.data().appliedStudents)) {
      await updateDoc(jobRef, { appliedStudents: [] });
    }

    await updateDoc(jobRef, {
      appliedStudents: arrayUnion(this.currentUser.id),
    });

    toastr.success("You have successfully applied for the job!", "Success");
    this.$emit('success'); // Emit success event after successful application
  } catch (error) {
    console.error("Error applying for the job:", error);
    toastr.error("Failed to apply for the job. Please try again.", "Error");
  } finally {
    this.isModalVisible = false;
    this.$emit("close");
  }
}
    },
    computed: {
        formattedDescription() {
            if (!this.jobDescription) return [];

            const sections = this.jobDescription.split('\n\n');
            return sections.map(section => {
                const [title, ...items] = section.split('\n');
                return {
                    title: title,
                    items: items.map(item => item.replace('• ', ''))
                };
            });
        }
    },
    emits: ['close', 'success'],
};
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
