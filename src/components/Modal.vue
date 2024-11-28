<template>
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="closeModal"
    >
      <div
        :class="['bg-white rounded-lg shadow-lg p-6 w-96', modalColorClasses[color]]"
      >
        <h2 class="text-xl font-semibold text-center mb-4">{{ title }}</h2>
        <p class="text-center mb-6" v-html="text"></p>

        <div v-if="$slots.actions" class="flex justify-center gap-4">
            <!-- Custom buttons from parent -->
            <slot name="actions"></slot>
        </div>
        <div v-else class="flex justify-center gap-4">
            <!-- Default close button -->
            <button
            @click="closeModal"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            Close
            </button>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Notification",
      },
      text: {
        type: String,
        default: "",
      },
      color: {
        type: String,
        default: "white", // Modal background color
      },
    },
    methods: {
      closeModal() {
        this.$emit("update:show", false);
      },
    },
    computed: {
      modalColorClasses() {
        return {
          black: "text-black",
          white: "bg-white text-gray-800",
          green: "bg-green-100 text-green-800",
          red: "bg-red-100 text-red-800",
          blue: "bg-blue-100 text-blue-800",
          orange: "bg-orange-100 text-orange-800",
        };
      },
    },
  };
  </script>