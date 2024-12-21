<template>
  <div :class="{ dark: isDarkModeApp, light: !isDarkModeApp }" class="app">
    <div class="container">
      <HeaderVue @update-dark-mode="handleDarkModeUpdate" @country-selected="fetchWeatherData" />
      <Banner :selectedCountry=selectedCountry />
      <WeatheInfo :selectedCountry=selectedCountry />
      <p style="text-align: center;">by ilhomjonfrontend@gmail.com | ©2024</p>
    </div>
  </div>
</template>

<script>
import HeaderVue from './components/Header.vue';
import Banner from './components/Banner.vue';
import WeatheInfo from './components/WeatheInfo.vue';

export default {
  components: { HeaderVue, Banner, WeatheInfo },
  data() {
    return {
      isDarkModeApp: false, // Initialize the dark mode state
      selectedCountry: 'tashkent'
    };
  },
  methods: {
    handleDarkModeUpdate(newMode) {
      this.isDarkModeApp = newMode; // Update the parent's dark mode state
    },
    fetchWeatherData(country) {
      this.selectedCountry = country;
      console.log('Fetching weather data for:', country);
    },
  }
}
</script>

<style>
/* Optional: Add your global styles for dark and light modes here */
.container {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark {
  background-color: black;
  color: #fff;
}

.light {
  background-color: #fff;
  color: #000;
}
</style>
