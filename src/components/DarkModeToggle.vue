<template>
  <div :class="{ dark: darkMode, light: !darkMode }" class="app-container">
    <ToggleButton :darkMode="darkMode" @toggle="toggleDarkMode" />
    <div class="content">
      <h1>{{ darkMode ? "Dark Mode" : "Light Mode" }}</h1>
      <p>This is a demonstration of dark and light modes in Vue.js.</p>
    </div>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton.vue';

export default {
  components: {
    ToggleButton,
  },
  data() {
    return {
      darkMode: false, // Default to light mode
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style>
.app-container {
  transition: background-color 0.3s, color 0.3s;
  padding: 20px;
  text-align: center;
  min-height: 100vh;
}

.light {
  background-color: #ffffff;
  color: #000000;
}

.dark {
  background-color: #000000;
  color: #ffffff;
}

.content {
  margin-top: 20px;
}
</style>
