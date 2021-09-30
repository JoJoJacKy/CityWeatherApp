import { weatherAPI } from './WeatherAPI'; // Async Function



/* <============ Initial Data ============> */
const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDate(daysList) {
  const dateObj = new Date();

  // Current Date
  const currentDate = dateObj.toDateString().slice(4);

  // Day
  const day = daysList[dateObj.getDay()];
  
  // Time
  let min = dateObj.getMinutes();
  if (min < 10) min = `0${min}`;
  const hours = dateObj.getHours() % 12;
  const ampm = hours >= 12 ? 'pm' : 'am';
  const time = `${hours}:${min} ${ampm}`;

  const dateTime = {
    currentDate,
    day,
    time
  }
  return dateTime;
}

function toggleUnits(unitsF, unitsC) {
  unitsF.classList.toggle('selected-unit');
  unitsC.classList.toggle('selected-unit');
}


let tempSymbol = '°F'; // Change on event

/* <============ CacheDOM ============> */

// City Weather
const description = document.querySelector('.weather-info-description');
const city = document.querySelector('.weather-info-city');
const date = document.querySelector('.weather-info-date');
const time = document.querySelector('.weather-info-time');
const temp = document.querySelector('.weather-info-temp');
const unitsF = document.querySelector('.weather-info-units-f');
const unitsC = document.querySelector('.weather-info-units-c');
const icon = document.querySelector('.city-icon');
const errorMsg = document.querySelector('.error-msg');

// Input Search
const searchInput = document.querySelector('.search-box-input');
const searchIcon = document.querySelector('.search-icon-img');

// Daily & Hourly
const daily = document.querySelector('.change-forecast-daily');
const hourly = document.querySelector('.change-forecast-hourly');

// Forecast
const forecastDailyNodeList = document.querySelectorAll('.forecast-daily');
const days = document.querySelectorAll('.day');
const tempHighs = document.querySelectorAll('.temp-high');
const tempLows = document.querySelectorAll('.temp-low');

// City Weather Details
const feelsText = document.querySelector('.feels-text');
const feelsTemp = document.querySelector('.feels-temp');
const humidityText = document.querySelector('.humidity-text');
const humidityNum = document.querySelector('.humidity-num');
const rainText = document.querySelector('.rain-text');
const rainPercent = document.querySelector('.rain-percent');
const windText = document.querySelector('.wind-text');
const windSpeed = document.querySelector('.wind-speed');

/* <============ Initial Website Load ============> */
async function initialInit() {
  // Grab weather data from API
  const weatherData = await weatherAPI();
  const cityData = weatherData.cityWeatherData;
  const forecastData = weatherData.dayHrWeatherData;

  updateWeatherDOM(cityData);
  updateForecastDays();
  updateForecastTemps(forecastData);
}

async function runSearch(searchParameter) {
  try {
    const weatherData = await weatherAPI(searchParameter);
    if (weatherData === null) return;
    const cityData = weatherData.cityWeatherData;
    const forecastData = weatherData.dayHrWeatherData;

    updateWeatherDOM(cityData);
    updateForecastDays();
    updateForecastTemps(forecastData);

    searchInput.value = '';
    errorMsg.innerText = '';
  }
  catch (error) {
    searchInput.value = '';
    errorMsg.innerText = 'City Not Found!';
  }

}

/* <============ DOM Manipulation ============> */
// Functions that modify the innerText of the CacheDOM elements
  // on search

function updateWeatherDOM(data) {
  const dateTimeDay = getDate(daysList);

  description.innerText = data.weather[0].main;
  city.innerText = data.name;
  date.innerText = `${dateTimeDay.day}, ${dateTimeDay.currentDate}`;
  time.innerText = dateTimeDay.time;
  temp.innerText = `${Math.round(data.main.temp)} ${tempSymbol}`;
  // console.log(data.weather[0].icon);

  feelsTemp.innerText = `${Math.round(data.main.feels_like)} ${tempSymbol}`;
  humidityNum.innerText = `${Math.round(data.main.humidity)} %`;
  // rainPercent.innerText = 
  windSpeed.innerText = `${Math.round(data.wind.speed)} mph`;
}

function updateForecastDays() {
  const dateObj = new Date();
  const currentDayNum = dateObj.getDay();
  days.forEach((day, currentIndex) => {
    let currentNum = currentDayNum + currentIndex;
    day.innerText = daysList[currentNum % 7];
  });
}

function updateForecastTemps(forecastData) {
  const dayData = forecastData.list; // A list * 8
  tempHighs.forEach((tempH, currentIndex) => {
    tempH.innerText = `${Math.round(dayData[currentIndex * 8].main.temp_max)} ${tempSymbol}`;
  });
  tempLows.forEach((tempL, currentIndex) => {
    tempL.innerText = `${Math.round(dayData[currentIndex * 8].main.temp_min)} ${tempSymbol}`;
  });
}

/* <============ Event Listeners ============> */
// Search Form Submit
// Daily Click
// Hourly Click
searchInput.addEventListener('keyup', (event) => {
  if (event.key === "Enter") {
    runSearch(searchInput.value);
    console.log(searchInput.value);
  }
});
searchIcon.addEventListener('click', (event) => {
  runSearch(searchInput.value);
  console.log(searchInput.value);
})
export { initialInit }