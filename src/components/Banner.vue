<template>
    <section>
        <div class="Weather-content">
            <div class="content-inner">
                <div class="content-top">
                    <div class="content-top-title">
                        <h1>{{ `${day?.temp}°` || 'N/A' }}</h1>
                        <h3>Today</h3>
                    </div>
                    <div class="weather-situation">
                        <img :src="`https://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`" alt="Sun">
                    </div>
                </div>
                <div class="content-bottom">
                    <span class="time">Time: {{ formatTimestampToDate(day?.dt) || 'N/A' }}</span>
                    <span class="country">Город: {{ this.selectedCountry }}</span>
                </div>
            </div>
            <div class="weather-description">
                <div class="description-inner">
                    <div class="weather-info">
                        <span>
                            <img src="../assets/images/temp.svg" alt="">
                        </span>
                        <p>Давление</p>
                        <h3>{{ day?.temp || 'N/A' }}° - ощущается как {{ day?.feels_like || 'N/A' }}°</h3>
                    </div>
                    <div class="weather-info">
                        <span>
                            <img src="../assets/images/pressure.svg" alt="">
                        </span>
                        <p>Температура</p>
                        <h3>{{ day?.humidity || 'N/A' }}% влажность</h3>
                    </div>
                    <div class="weather-info">
                        <span>
                            <img src="../assets/images/Group.svg" alt="">
                        </span>
                        <p>Осадки</p>
                        <h3>{{ day?.weather[0].description || 'N/A' }}</h3>
                    </div>
                    <div class="weather-info">
                        <span>
                            <img src="../assets/images/wind.svg" alt="">
                        </span>
                        <p>Ветер</p>
                        <h3>{{ day?.wind_speed || 'N/A' }} м/с</h3>
                    </div>
                </div>
                <div class="background">
                    <img src="../assets/images/background.png" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import weatherService from "@/services/weatherService";

export default {
    data() {
        return {
            weatherData: null,
            day: null
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
        async get_weather_date(cityName) {
            try {
                if (cityName == undefined) {
                    cityName = 'Tashkent';
                }
                const data = await weatherService.getCityCoordinates(cityName);
                const result = await weatherService.getWeatherData(data.lat, data.lon);

                this.weatherData = result;
                console.log("Weather data fetched successfully:", this.weatherData);

                this.day = this.weatherData.current;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        formatTimestampToDate(timestamp) {
            if (timestamp == undefined) {
                return 'N/A'
            }
            console.log('time ')
            console.log(timestamp)
            const date = new Date(timestamp * 1000);
            console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
            const options = { hour: '2-digit', minute: '2-digit', hourCycle: 'h12', timeZone: 'Asia/Yekaterinburg' };
            const time = new Intl.DateTimeFormat('ru-RU', options).format(date);

            return ` ${time}`;
        }
    },
    mounted() {
        this.get_weather_date('Tashkent');
    }
};
</script>


<style scoped>
@import "@/styles/banner.css";
</style>