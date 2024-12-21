// src/services/weatherService.js

export default {
    apiKey: "ff76957a95b4270a6d484ebca7781f80", // Your OpenWeatherMap API key

    async getCityCoordinates(cityName) {
        try {
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${this.apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch coordinates for ${cityName}.`);
            }
            const data = await response.json();
            if (!data.length) {
                throw new Error(`City ${cityName} not found.`);
            }
            return { lat: data[0].lat, lon: data[0].lon };
        } catch (error) {
            console.error("Error fetching city coordinates:", error);
            throw error;
        }
    },
    async getWeatherData(lat, lon) {
        try {
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }

            const data = await response.json(); // Get the weather data from the response
            return data; // Return the weather data
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error; // Propagate the error for the caller to handle
        }
    }
};
