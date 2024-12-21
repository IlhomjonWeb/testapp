<template>
    <section>
        <div class="weather-day-info">
            <div class="weather-day-btn">
                <button class="blue" @click="get_weather_date('tashkent')">На неделю</button>
                <!-- {{ this.weatherData }} -->
                <button class="white" @click="hide_weather_date">Отменить</button>
            </div>
            <div class="weather-day-cart">
                <div v-for="weather in daily" :key="weather.dt" class="cart">
                    <h3 class="cart-hero-title">{{ formatTimestampToDayAndDate(weather.dt) }}</h3>
                    <span class="cart-day">{{ formatTimestampToShortDate(weather.dt) }}</span>
                    <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt=""
                        class="weather-status">
                    <!-- {{ weather.weather[0].icon }} -->
                    <span class="weather-temp">{{ weather.feels_like.day }}° </span>
                    <span class="weather-second-temp">{{ weather.feels_like.night }}°</span>
                    <span class="weather-situation">{{ weather.weather[0].description }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// Import the weather service
import weatherService from "@/services/weatherService";

export default {
    data() {
        return {
            weatherData: null,
            daily: null,
        };
    },
    props: {
        selectedCountry: String,
    },
    watch: {
        selectedCountry: function (cityName, oldVal) { // watch it
            console.log('Prop changed: ', cityName, ' | was: ', oldVal)
            if (cityName == '' || cityName == undefined) {
                cityName = 'Tashkent';
            }
            this.get_weather_date(cityName);
        }
    },
    methods: {
        formatTimestampToShortDate(timestamp) {
            const date = new Date(timestamp * 1000);
            const day = date.getDate();
            const month = date.toLocaleDateString("en-US", { month: "short" });
            return `${day} ${month}`;
        },
        formatTimestampToDayAndDate(timestamp) {
            const date = new Date(timestamp * 1000);
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            const isToday = date.toDateString() === today.toDateString();
            const isTomorrow = date.toDateString() === tomorrow.toDateString();

            if (isToday) {
                return "Today";
            } else if (isTomorrow) {
                return "Tomorrow";
            } else {
                const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
                return dayName;
            }
        },
        async get_weather_date(cityName) {
            try {
                if (cityName == undefined || cityName === '') {
                    cityName = 'Tashkent';
                }
                const data = await weatherService.getCityCoordinates(cityName);
                const result = await weatherService.getWeatherData(data.lat, data.lon);
                this.weatherData = result;
                this.daily = this.weatherData.daily;
                this.daily.shift();
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        async hide_weather_date() {
            this.daily = ''
        }

    },
    mounted() {
        this.get_weather_date('Tashkent');
    },
};
</script>


<style scoped>
@import "@/styles/daily.css";
</style>