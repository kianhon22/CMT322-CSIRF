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
                <h2 class="text-lg font-bold">{{ isJob ? 'Add Job' : 'Edit Applicant' }}</h2>
            </div>
            <div class="p-4">
                <form @submit.prevent="saveChanges">
                    <div v-for="field in editableFields" :key="field.key" class="mb-4">
                        <label :for="field.key" class="block font-medium capitalize">{{ field.label }}</label>
                        <input
                            v-if="field.type === 'input'"
                            v-model="editableItem[field.key]"
                            :id="field.key"
                            class="border rounded px-4 py-2 w-full"
                        />
                        <select
                            v-if="field.type === 'select'"
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
                            type="submit"
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
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editableItem: { ...this.item },
            jobFields: [
                { key: 'position', label: 'Position', type: 'input' },
                { key: 'description', label: 'Description', type: 'input' },
                { key: 'type', label: 'Type', type: 'select', options: ['Full-Time', 'Part-Time', 'Internship'] },
                { key: 'mode', label: 'Mode', type: 'select', options: ['On-Site', 'Hybrid', 'WFH'] },
            ],
            studentFields: [
                { key: 'name', label: 'Name', type: 'input' },
                { key: 'email', label: 'Email', type: 'input' },
                { key: 'phone', label: 'Phone', type: 'input' },
                { key: 'year', label: 'Year', type: 'select', options: [1, 2, 3, 4] },
            ],
        };
    },
    computed: {
        isJob() {
            return this.item.position !== undefined;
        },
        editableFields() {
            return this.isJob ? this.jobFields : this.studentFields;
        },
    },
    methods: {
        saveChanges() {
            this.$emit('update', this.editableItem);
            this.$emit('close');
        },
        deleteItem() {
            this.$emit('update', { ...this.editableItem, _delete: true });
            this.$emit('close');
        },
    },
};
</script>
