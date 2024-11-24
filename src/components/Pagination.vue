<template>
    <div class="flex justify-between items-center mt-4">
        <!-- Pagination Info -->
        <div class="ml-3">
            <p class="text-sm text-gray-500">
                Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalEntries }} entries
            </p>
        </div>
        <!-- Pagination Controls -->
        <div class="flex space-x-2 m-2">
          <button
              :disabled="currentPage === 1"
              @click="$emit('change', currentPage - 1)"
              class="px-2 py-1 border border-[#969595] text-black hover:bg-[#1E1B4B] hover:text-white cursor-pointer disabled:hover:bg-[#1E1B4B] disabled:cursor-not-allowed"
          >
              <span>&laquo;</span>
          </button>
          <button
              v-for="page in visiblePages"
              :key="page"
              @click="$emit('change', page)"
              :class="[
                  'px-3 py-1 border',
                  page === currentPage ? 'bg-[#1E1B4B] text-white' : ' text-white hover:bg-gray-300',
              ]"
          >
              {{ page }}
          </button>
          <button
              :disabled="currentPage === totalPages"
              @click="$emit('change', currentPage + 1)"
              class="px-2 py-1 border border-[#969595] text-black hover:bg-[#1E1B4B] hover:text-white cursor-pointer disabled:hover:bg-[#1E1B4B] disabled:cursor-not-allowed"
          >
              <span>&raquo;</span>
          </button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
      currentPage: {
          type: Number,
          required: true,
      },
      totalPages: {
          type: Number,
          required: true,
      },
      totalEntries: {
          type: Number,
          required: true,
      },
      itemsPerPage: {
          type: Number,
          required: true,
      },
  },
  computed: {
      startIndex() {
          return (this.currentPage - 1) * this.itemsPerPage;
      },
      endIndex() {
          return Math.min(this.startIndex + this.itemsPerPage, this.totalEntries);
      },
      visiblePages() {
          const range = [];
          for (let i = 1; i <= this.totalPages; i++) {
              range.push(i);
          }
          return range;
      },
  },
};
</script>

<style>
/* Add custom styles if necessary */
</style>