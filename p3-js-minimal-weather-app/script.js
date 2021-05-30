// Key

const apiKey = '76f654a48e6748fb0ff773c36fd46f5b';
let cityInput = null;

// Weather Data

let city = null;
let country = null;
let temp = null;
let icon = null;
let icon_src = null;
let icon_alt = null;
let weather_id = null;

// Selectors

const inputBox = document.querySelector('.input-box');
const form = document.querySelector('.controls-section form');
const submitBtn = document.querySelector('#submit-btn');
const demoBtn = document.querySelector('#demo-btn');
const resetBtn = document.querySelector('#reset-btn');
const cityList = document.querySelector('.output-section .cities');
const errMsg = document.querySelector('#error-message');

// Event Listeners

form.addEventListener('submit', e => {
    e.preventDefault();
    getWeather(inputBox.value);
});

resetBtn.addEventListener('click', reset);
demoBtn.addEventListener('click', demo);

// AJAX

function getWeather(cityInput) {
    const url = `//api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
    return fetch(url)
            .then(response => {
                if (response.status === 404) {
                    let msg = 'Please enter a valid city name! 🤷‍♂️';
                    errMsg.textContent = msg;
                    throw new Error(msg);
                } else if (response.status !== 200) {
                    throw new Error('Something went wrong!');
                }
                return response.json()
            })
            .then(data => {
                const {main, name, sys, weather} = data;
                city = name;
                country = sys.country;
                temp = Math.round(main.temp);
                icon = weather[0]["icon"];
                icon_src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                icon_alt = weather[0]["description"];
                weather_id = weather[0]["id"];
                weather_desc = getWeatherDescriptionFromId(weather_id);

                displayWeather(city, country, temp, icon_src, icon_alt, weather_desc);
            })
            .catch(e => {
                console.log('Error for developers: ' + e);
            })
}

function displayWeather(city, country, temp, icon_src, icon_alt, weather_desc) {
    const li = document.createElement("li");
    li.classList.add("city");

    const markup = `
        <h2 class="city-name">${city}, ${country}</h2>
        <p class="city-temp">${temp}<sup>°C</sup></p>
        <img class="city-icon" src="${icon_src}" alt="${icon_alt}">
        <p class="city-weather-desc">${weather_desc}</p>
        `;

    li.innerHTML = markup;
    cityList.appendChild(li);
}

function getWeatherDescriptionFromId(weather_id) {
    if (weather_id >=200 && weather_id < 300) {
        return 'Thunderstorm';
    } else if (weather_id >=300 && weather_id < 400) {
        return 'Drizzle';
    } else if (weather_id >=500 && weather_id < 600) {
        return 'Rain';
    } else if (weather_id >=600 && weather_id < 700) {
        return 'Snow';
    } else if (weather_id >=801 && weather_id < 900) {
        return 'Clouds';
    } else if (weather_id === 800) {
        return 'Clear';
    }
}

function demo() {
    const list_of_cities = [
        'Mumbai', 
        'New York', 
        'Seoul', 
        'Lisbon'
    ];

    reset();
    list_of_cities.forEach(function(val){
        getWeather(val);
    });
}

function reset() {
    cityList.innerHTML = '';
}

// init
demo();