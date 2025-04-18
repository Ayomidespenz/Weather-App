

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const API_KEY = "ea13613e50586d90b9c0d9940a2f34bf";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${data.main.temp}°C`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "./image/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "image/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "image/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "image/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "image/mist.png";
    } else {
        weatherIcon.src = "image/default.png"; 
    }
}

async function checkWeatherByCoords(lat, lon) {
    const API_KEY = "ea13613e50586d90b9c0d9940a2f34bf";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${data.main.temp}°C`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "./image/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "image/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "image/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "image/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "image/mist.png";
    } else {
        weatherIcon.src = "image/default.png"; 
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Get user's location and fetch weather data
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                checkWeatherByCoords(lat, lon);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Unable to retrieve your location. Please search for a city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});