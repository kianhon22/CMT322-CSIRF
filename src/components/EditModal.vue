<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 text-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-1/2 relative">
            <button
                type="button"
                @click="$emit('close')"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="p-4 border-b">
                <h2 class="text-lg font-bold">{{ editableItem.id ? 'Edit' : 'Add' }} {{ isJob ? 'Job' : 'Applicant' }}</h2>
            </div>
            <div class="p-4">
                <form @submit.prevent="saveChanges">
                    <div class="mb-4" v-for="field in jobFields" :key="field.key">
                        <label :for="field.key" class="block font-medium capitalize">{{ field.label }}</label>
                        <input
                            v-if="field.type === 'input'"
                            v-model="editableItem[field.key]"
                            :id="field.key"
                            class="border rounded px-4 py-2 w-full"
                        />
                        <select
                            v-else-if="field.key === 'companyID' && user.role === 'admin'"
                            v-model="editableItem.companyID"
                            :id="field.key"
                            class="border rounded px-4 py-2 w-full"
                        >
                            <option v-for="company in companies" :key="company.id" :value="company.id">
                                {{ company.name }}
                            </option>
                        </select>
                        <select
                            v-else
                            v-model="editableItem[field.key]"
                            :id="field.key"
                            class="border rounded px-4 py-2 w-full"
                        >
                            <option v-for="option in field.options" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                    <div class="flex justify-between items-center">
                        <button
                            v-if="editableItem.id"
                            type="button"
                            @click="deleteItem"
                            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            @click="saveChanges"
                            :class="[
                                'px-4 py-2 bg-[#1E1B4B] hover:bg-[#4e4eaa] text-white rounded',
                                { 'ml-auto': !editableItem.id }
                            ]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
    props: {
        item: {
            type: Object,
            required: true,
            // default: () => ({}), // Provide a default empty object
        },
        companies: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            user: null,
            editableItem: { ...this.item },
            jobFields: [],
        };
    },
    computed: {
        isJob() {
            return this.item && this.item.position !== undefined;
        },
    },
    watch: {
        user: {
            immediate: true,
            handler(user) {
                if (!user || !user.role) return; // Safely handle null user

                // Dynamically populate jobFields based on user.role
                this.jobFields = [
                    ...(user.role == 'admin'
                        ? [{ key: 'companyID', label: 'Company', type: 'select' }]
                        : []),
                    { key: 'position', label: 'Position', type: 'input' },
                    { key: 'description', label: 'Description', type: 'input' },
                    { key: 'type', label: 'Type', type: 'select', options: ['Full-Time', 'Part-Time', 'Internship'] },
                    { key: 'mode', label: 'Mode', type: 'select', options: ['On-Site', 'Hybrid', 'WFH'] },
                ];

                if (user.role == 'company') {
                    this.editableItem.companyID = user.companyID;
                }
            },
        },
    },
    methods: {
        saveChanges() {
            this.$emit('update', this.editableItem);
        },
        deleteItem() {
            this.$emit('update', { ...this.editableItem, delete: true });
            this.$emit('close');
        },
    },
    async created() {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                this.user = userDoc.data();
                }
            } else {
                this.$router.push('/login');
            }
        });
    },
};
</script>
