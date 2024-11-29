<template>
    <div class="p-6 bg-[#1E1B4B] min-h-screen">
        <h1 class="text-4xl font-bold text-center mb-4 text-white">Dashboard</h1>
        <div class="container mx-auto bg-white rounded-lg shadow">
            <!-- Tabs -->
            <div class="border-b">
                <nav class="-mb-px flex space-x-4 px-4">
                    <button
                        :class="tab === 'jobs' ? activeTabClass : inactiveTabClass"
                        @click.prevent="tab = 'jobs'"
                    >Company Jobs
                    </button>
                    <button
                        :class="tab === 'students' ? activeTabClass : inactiveTabClass"
                        @click.prevent="tab = 'students'"
                    >Applicants
                    </button>
                </nav>
            </div>

            <!-- Filters -->
            <div class="flex justify-between items-center p-4">
                <div>
                    <input v-if="tab === 'jobs'"
                        v-model="jobSearch"
                        type="text"
                        placeholder="Search Jobs..."
                        class="border rounded px-4 py-2 text-black"
                    />
                    <input v-else
                        v-model="studentSearch"
                        type="text"
                        placeholder="Search Applicants..."
                        class="border rounded px-4 py-2 text-black"
                    />
                    <select v-model="jobTypeFilter" v-if="tab === 'jobs'" class="border rounded px-4 py-2 text-black ml-2">
                        <option value="">Type</option>
                        <option class="hover:bg-[#1E1B4B] hover:text-white" value="Full-time">Full-time</option>
                        <option class="hover:bg-[#1E1B4B] hover:text-white" value="Internship">Internship</option>
                    </select>
                    <select v-model="jobModeFilter" v-if="tab === 'jobs'" class="border rounded px-4 py-2 text-black ml-2">
                        <option value="">Mode</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                    <select v-model="studentYearFilter" v-if="tab === 'students'" class="border rounded px-4 py-2 text-black ml-2">
                        <option value="">Year</option>
                        <option v-for="year in [1, 2, 3, 4]" :key="year" :value="year">
                            Year {{ year }}
                        </option>
                    </select>
                    <select
                        v-model="itemsPerPage"
                        class="border rounded px-4 py-2 text-black ml-2"
                    >
                        <option v-for="number in [10, 15, 20, 25]" :key="number" :value="number">
                            {{ number }} Entries
                        </option>
                    </select>
                </div>
                <div class="flex items-center">
                    <button
                        @click.prevent="refresh"
                        class="mr-2 px-4 py-2 bg-[#1E1B4B] text-white hover:bg-[#4e4eaa] rounded"
                    >
                        Refresh
                    </button>
                    <button
                        @click.prevent="exportToCSV"
                        class="px-4 py-2 bg-[#1E1B4B] text-white hover:bg-[#4e4eaa] rounded"
                    >
                        Export CSV
                    </button>
                </div>
            </div> 
    
            <!-- Jobs Table -->
            <div v-if="tab === 'jobs'">
                <table class="w-full table-auto border-collapse border">
                    <thead class="text-white">
                        <tr class="bg-[#1E1B4B]">
                            <th class="p-2 border border-white">No.</th>
                            <th v-if="currentUser.role === 'admin'" class="p-2 border border-white">
                                Company
                                <button @click.prevent="sort('name')" class="ml-2">
                                    <span :class="getSortIcon('name')">▲</span>
                                </button>
                            </th>
                            <th class="p-2 border border-white">
                                Position
                                <button @click.prevent="sort('position')" class="ml-2">
                                    <span :class="getSortIcon('position')">▲</span>
                                </button>
                            </th>
                            <th class="p-2 border border-white">Type</th>
                            <th class="p-2 border border-white">Mode</th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                        <tr
                            v-for="(job, index) in paginatedJobs"
                            :key="job.id"
                            class="text-center hover:bg-[#1E1B4B] hover:text-white cursor-pointer"
                            @click.prevent="openEditModal(job)"
                        >
                            <td class="p-2 border border-[#1E1B4B]">{{ index + 1 }}</td>
                            <td v-if="currentUser.role === 'admin'" class="p-2 border border-[#1E1B4B]">{{ job.name }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ job.position }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ job.type }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ job.mode }}</td>
                        </tr>
                    </tbody>
                </table>
                <Pagination
                    :currentPage="jobPage"
                    :totalPages="jobTotalPages"
                    :totalEntries="filteredJobs.length"
                    :itemsPerPage="itemsPerPage"
                    @change="changeJobPage"
                />
            </div>
    
            <!-- Applicants Table -->
            <div v-if="tab === 'students'">
                <table class="w-full table-auto border-collapse border">
                    <thead class="text-white">
                        <tr class="bg-[#1E1B4B]">
                            <th class="p-2 border border-white">No.</th>
                            <th class="p-2 border border-white">
                                Name
                                <button @click.prevent="sort('name')" class="ml-2">
                                    <span :class="getSortIcon('name')">▲</span>
                                </button>
                            </th>
                            <th class="p-2 border border-white">
                                Year
                                <button @click.prevent="sort('year')" class="ml-2">
                                    <span :class="getSortIcon('year')">▲</span>
                                </button>
                            </th>
                            <th class="p-2 border border-white">Email</th>
                            <th class="p-2 border border-white">Phone</th>
                            <th class="border border-white">Resume Link</th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                        <tr
                            v-for="(student, index) in paginatedStudents"
                            :key="student.id"
                            class="text-center"
                        >
                            <td class="p-2 border border-[#1E1B4B]">{{ index + 1 }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ student.name }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ student.year }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ student.email }}</td>
                            <td class="p-2 border border-[#1E1B4B]">{{ student.phone }}</td>
                            <td class="p-2 border border-[#1E1B4B]">
                                <a
                                    v-if="student.resume"
                                    :href="`/resume/${student.resume}`"
                                    target="_blank"
                                    class="text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer"
                                >
                                    View Resume
                                </a>
                                <span v-else>-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination
                    :currentPage="studentPage"
                    :totalPages="studentTotalPages"
                    :totalEntries="filteredStudents.length"
                    :itemsPerPage="itemsPerPage"
                    @change="changeStudentPage"
                />
            </div>
        </div>

        <EditModal
            :item="selectedItem"
            v-if="isModalOpen"
            @close="closeEditModal"
            @update="updateItem"
        />    
    </div>
</template>
  
<script>
import EditModal from '@/components/EditModal.vue';
import Pagination from '@/components/Pagination.vue';
import jobData from '../data/jobData.json';
import userData from '../data/userData.json';

import { inject } from 'vue';

export default {
    setup() {
        const currentUser = inject('currentUser')
        return { currentUser }
    },
    components:{
        EditModal, Pagination
    },
    data() {
        return {
            // Filters
            jobSearch: '',
            studentSearch: '',
            jobTypeFilter: '',
            jobModeFilter: '',
            studentYearFilter: '',
            itemsPerPage: 10,

            // Data
            tab: 'jobs',
            jobs: jobData,
            students: userData.student,

            // Pagination
            jobPage: 1,
            studentPage: 1,

            // Others
            sortKey: '',
            sortOrder: 1, 
            isModalOpen: false,
            selectedItem: null,
        };
    },
    computed: {
        filteredJobs() {
            return this.jobs
                .filter((job) => {
                    return (
                        job.name.toLowerCase().includes(this.jobSearch.toLowerCase().trim()) ||
                        job.position.toLowerCase().includes(this.jobSearch.toLowerCase().trim())
                    );
                })
                .filter((job) => {
                    return (
                        (this.jobTypeFilter ? job.type === this.jobTypeFilter : true) &&
                        (this.jobModeFilter ? job.mode === this.jobModeFilter : true)
                    );
                });
        },
        paginatedJobs() {
            const start = (this.jobPage - 1) * this.itemsPerPage;
            return this.filteredJobs.slice(start, start + this.itemsPerPage);
        },
        jobTotalPages() {
            return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
        },

        filteredStudents() {
            return this.students
                .filter((student) => {
                    if (this.currentUser.role == "sponsor") {
                        return student.applyJob == true;
                    }
                    return true;    // Skip the filter for other roles
                })                
                .filter((student) => {
                    return (
                        student.name.toLowerCase().includes(this.studentSearch.toLowerCase().trim()) ||
                        student.email.toLowerCase().includes(this.studentSearch.toLowerCase().trim()) ||
                        student.phone.toLowerCase().includes(this.studentSearch.toLowerCase().trim())
                    );
                })
                .filter((student) => {
                    return (
                        (this.studentYearFilter ? student.year === this.studentYearFilter : true)
                    );
                });
        },
        paginatedStudents() {
            const start = (this.studentPage - 1) * this.itemsPerPage;
            return this.filteredStudents.slice(start, start + this.itemsPerPage);
        },
        studentTotalPages() {
            return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
        },
        activeTabClass() {
            return 'text-[#1E1B4B] border-b-2 border-[#1E1B4B] py-2';
        },
        inactiveTabClass() {
            return 'text-gray-500 hover:text-[#1E1B4B] py-2';
        },
    },
    methods: {
        openEditModal(item) {
            this.selectedItem = { ...item };
            this.isModalOpen = true;
        },
        closeEditModal() {
            this.isModalOpen = false;
        },
        sort(key) {
            if (this.sortKey === key) {
                this.sortOrder *= -1; // Toggle sorting order
            } else {
                this.sortKey = key;
                this.sortOrder = 1; // Default to ascending
            }

            (this.tab == 'jobs' ? this.jobs : this.students).sort((a, b) => {
                if (a[key] > b[key]) return this.sortOrder;
                if (a[key] < b[key]) return -this.sortOrder;
                return 0;
            });
        },
        getSortIcon(key) {
            if (this.sortKey !== key) return '';
            return this.sortOrder === 1 ? '▲' : '▼'; // Unicode arrows for ascending/descending
        },
        changeJobPage(page) {
            this.jobPage = page;
        },
        changeStudentPage(page) {
            this.studentPage = page;
        },
        updateItem(updatedItem) {
            if (this.tab === 'jobs') {
                const index = this.jobs.findIndex((job) => job.id === updatedItem.id);
                if (index !== -1) {
                    this.jobs.splice(index, 1, updatedItem);
                }
            } 
            else if (this.tab === 'students') {
                const index = this.students.findIndex((student) => student.id === updatedItem.id);
                if (index !== -1) {
                    this.students.splice(index, 1, updatedItem);
                }
            }
        },
        refresh() {
            this.jobSearch = ''
            this.studentSearch = ''
            this.jobTypeFilter = ''
            this.jobModeFilter = ''
            this.studentYearFilter = ''
            this.itemsPerPage = 10
            this.jobPage =  1
            this.studentPage =  1
            this.sortKey = ''
            this.sortOrder = ''
        },
        exportToCSV() {
            const rows = this.tab === 'jobs' ? this.filteredJobs : this.filteredStudents;

            if (!rows.length) {
                alert('No data to export.');
                return;
            }

            const headers = this.tab === 'jobs'
                ? ['Company', 'Position', 'Type', 'Mode']
                : ['Name', 'Year', 'Email', 'Phone', 'Resume'];

            const data = rows.map((row) => {
                if (this.tab === 'jobs') {
                    return [row.name, row.position, row.type, row.mode];
                } else {
                    return [row.name, row.year, row.email, row.phone, row.resume || '-'];
                }
            });

            const csvContent = [
                headers.join(','), // Add headers as the first row
                ...data.map((row) => row.map((value) => `"${value}"`).join(',')) // Add data rows
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.tab}_data.csv`);
            document.body.appendChild(link);
            link.click.prevent();
            document.body.removeChild(link);
        },
    },
};
</script>

<style>
/* Add custom styles if needed */
</style>
  