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
                            @click="viewCompany"
                            class="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-colors duration-300"
                        >
                            Company Details
                        </button>
                        <button
                            @click="applyJob"
                            class="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-colors duration-300"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        title: String,
        description: String,
        jobDescription: String,
        companyId: Number
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
            // You can emit an event or handle the application logic here
            this.$emit("apply");
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
    }
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
