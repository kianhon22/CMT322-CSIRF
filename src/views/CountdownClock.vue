<template>
  <div id="countdown-clock" class="bg-center bg-no-repeat bg-cover flex flex-col justify-center w-full py-12">
    <div class="wrapper text-center text-white">
      <div class="mb-2">
        <h2 class="text-3xl lg:text-5xl font-extrabold text-white">
          CSIRF 2025
        </h2>
        <p class="text-xl lg:text-2xl font-light mt-2 mb-2 text-gray-300">
          Starts In
        </p>
      </div>
      </div>

      <!-- Countdown -->
      <div class="clock grid grid-cols-4 gap-12 text-center">
        <!-- Days -->
        <div class="number">
          <span class="digit text-6xl lg:text-8xl font-extrabold text-orange-500">{{ days }}</span>
          <span class="label text-2xl lg:text-2xl text-gray-300 mt-4">Days</span>
        </div>
        <!-- Hours -->
        <div class="number">
          <span class="digit text-6xl lg:text-8xl font-extrabold text-orange-500">{{ hours }}</span>
          <span class="label text-2xl lg:text-2xl text-gray-300 mt-4">Hours</span>
        </div>
        <!-- Minutes -->
        <div class="number">
          <span class="digit text-6xl lg:text-8xl font-extrabold text-orange-500">{{ minutes }}</span>
          <span class="label text-2xl lg:text-2xl text-gray-300 mt-4">Minutes</span>
        </div>
        <!-- Seconds -->
        <div class="number">
          <span class="digit text-6xl lg:text-8xl font-extrabold text-orange-500">{{ seconds }}</span>
          <span class="label text-2xl lg:text-2xl text-gray-300 mt-4">Seconds</span>
        </div>
        </div>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        targetDate: new Date("2025-01-02T00:00:00").getTime(), // Event date
      };
    },
    mounted() {
      this.startCountdown();
    },
    methods: {
      startCountdown() {
        setInterval(() => {
          const now = new Date().getTime();
          const timeRemaining = this.targetDate - now;
  
          if (timeRemaining >= 0) {
            this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
            this.hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
              .toString()
              .padStart(2, "0");
            this.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
              .toString()
              .padStart(2, "0");
            this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
              .toString()
              .padStart(2, "0");
          }
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    margin: auto;
    padding: 20px;
  }
  .clock {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  .number {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .label {
    color: #ffffff; /* White for the label */
  }
  </style>
  