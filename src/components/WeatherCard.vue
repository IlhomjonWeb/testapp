<template>
  <div class="weather-card">
    <div v-if="loading" class="loader">Loading weather data...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <h2>Weather in Tashkent</h2>
      <p>🌡 Temperature: {{ weatherData.current.temp }} °C</p>
      <p>☁️ Condition: {{ weatherData.current.weather[0].description }}</p>
      <p>💨 Wind Speed: {{ weatherData.current.wind_speed }} m/s</p>
      <p>📅 Last Updated: {{ formatDate(lastUpdated) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weatherData: null,
      loading: true,
      error: null,
      lastUpdated: null,
      apiKey: "ff76957a95b4270a6d484ebca7781f80", // Your OpenWeatherMap API key
      latitude: 41.2995, // Tashkent latitude
      longitude: 69.2401, // Tashkent longitude
    };
  },
  methods: {
    async fetchWeather() {
      this.loading = true;
      this.error = null;

      try {
        const cachedWeather = localStorage.getItem("weatherData");
        const cachedTimestamp = localStorage.getItem("weatherTimestamp");
        const now = Date.now();

        if (cachedWeather && cachedTimestamp && now - cachedTimestamp < 3600000) {
          this.weatherData = JSON.parse(cachedWeather);
          this.lastUpdated = new Date(Number(cachedTimestamp));
          this.loading = false;
          return;
        }

        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`;
        const response = await fetch(url);
        console.log(this.latitude + 'test')
        if (!response.ok) {
          throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();
        this.weatherData = data;
        this.lastUpdated = new Date();

        localStorage.setItem("weatherData", JSON.stringify(data));
        localStorage.setItem("weatherTimestamp", Date.now());
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  mounted() {
    this.fetchWeather();
  },
};
</script>

<style scoped>
.weather-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  background-color: #f9f9f9;
  color: #333;
}

.loader {
  font-size: 1.5rem;
  color: #007bff;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
