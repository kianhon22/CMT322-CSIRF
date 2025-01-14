<template>
    <section class="bg-center bg-cover bg-no-repeat bg-[url('/csirf-background.png')] h-screen w-full flex items-center justify-center parallax">
      <div class="flex flex-col items-center text-center px-8 py-8">
            <div class="lg:col-span-7 text-center lg:text-center">
                <h1 class="text-white fade-in w-full mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-7xl">
                  COMPUTER SCIENCE INTERNSHIP <br> & RECRUITMENT FAIR
                  <span class="font-extrabold text-orange-500 blink">2025</span>
                </h1>
                <p class="text-white fade-in w-full mb-6 font-light md:text-lg lg:text-2xl">
                    Fulfilling Dreams, Empowering Your Future
                </p>
                <div class="fade-in-thin-air flex flex-col lg:flex-row justify-center gap-4 mt-12">
                    <router-link to="/announcement"
                    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#1E1B4B] rounded-lg bg-orange-500 border border-transparent hover:bg-transparent hover:text-orange-500 hover:border-orange-500 focus:ring-4">
                    Announcements
                    </router-link>
                    <router-link to="/career"
                    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#1E1B4B] border border-transparent rounded-lg bg-white hover:bg-transparent hover:border-white hover:text-white">
                    Explore Careers
                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-center bg-[#1E1B4B] py-16 w-full flex flex-col items-center">
      <div class="mt-6 bg-[#2A2B4D] happening-banner rounded-lg shadow-lg border-2 border-orange-500 max-w-3xl w-full px-6 py-8 text-center">
        <p id="typewriter1" class="text-white font-medium md:text-lg lg:text-4xl typewriter">
          Happening on <span class="font-bold text-orange-500">2 & 3 January 2025</span>
        </p>
        <p class="text-white font-normal mt-4 md:text-md lg:text-2xl">
          Dewan Utama Pelajar, Universiti Sains Malaysia
        </p>
      </div>
    </section>
    <section class="py-10 bg-[#1E1B4B]">
      <CountdownClock/>
    </section>
    <section class="bg-center bg-[#1E1B4B] py-2 w-full">
      <h1 class="text-4xl mb-6 font-bold text-center text-white">About Us</h1> 
      <p class="text-white max-w-2xl mx-auto mb-20 font-light text-justify md:text-lg lg:text-xl">
        The <span class="text-orange-500"> Computer Science Internship & Recruitment Fair (CSIRF) </span>
        is a two-day flagship event organised by the Computer Science Society (USM CS Society).
        It consists of a series of career talks and booth exhibitions tailored for third and
        final-year undergraduates from the School of Computer Sciences, Universiti Sains Malaysia.
      </p>
    </section>
    <section id="company" class="bg-center bg-orange-500 py-8 w-full">
      <h1 class="text-4xl font-bold text-center mt-2 mb-12 text-white">Company</h1>
      <div class="mb-6 grid grid-cols-4 gap-6 pl-20 pr-20">
        <router-link
          v-for="(company, index) in companies"
          :key="index"
          :to="{ name: 'Company', params: { id: company.sponsorID }}"
          class="bg-white rounded-lg shadow-lg flex flex-col items-center p-4 hover:shadow-xl transition-shadow hover:bg-gray-100">
          <img :src="company.logo" :alt="company.name" class="h-24 w-24 object-contain rounded-full mb-4"/>
          <h3 class="text-lg font-semibold text-gray-800">{{ company.name }}</h3>
          <span :class="categoryClass(company.category)" class="px-3 py-1 mt-2 rounded-full text-sm font-medium">
            {{ capitalize(company.category) }}
          </span>
        </router-link>
      </div>
    </section>
    <!-- Itinerary Component -->
    <Itinerary/>
</template>

<script>
import companyData from "@/data/companyData.json";
import Itinerary from "@/components/Itinerary.vue";
import CountdownClock from "@/components/CountdownClock.vue";

export default {
  data() {
    return {
      companies: companyData,
    };
  },
  components: {
       Itinerary,
       CountdownClock,
    },
  methods: {
    categoryClass(category) {
      switch (category) {
        case "platinum":
          return "bg-purple-200 text-purple-800";
        case "gold":
          return "bg-yellow-200 text-yellow-800";
        case "silver":
          return "bg-gray-200 text-gray-800";
        case "bronze":
          return "bg-orange-200 text-orange-800";
        default:
          return "bg-green-200 text-green-800";
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  mounted() {
    const typewriter1 = document.getElementById("typewriter1");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typewriter1.classList.add("typewriter-active");
            observer.disconnect(); // Stop observing after the animation starts
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(typewriter1.parentElement); // Observe the parent container
  },
};
</script>

<style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 2s ease-in-out forwards;
  }

  @keyframes fadeInThinAir {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in-thin-air {
    opacity: 0; /* Ensure the element starts invisible */
    animation: fadeInThinAir 2s ease-in-out forwards; /* Add animation */
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .blink {
    animation: blink 1s 1;
    animation-delay: 1.5s;
  }

  .happening-banner {
    border: 2px solid transparent;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.052) 50%, rgba(255, 153, 0, 0.229) 100%);
    border-radius: 16px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }

  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .typewriter {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: none;
    width: 100%; /* Initial width */
  }
  .typewriter-active {
    animation: typewriter 3s steps(31, end) forwards;
  }
</style>
