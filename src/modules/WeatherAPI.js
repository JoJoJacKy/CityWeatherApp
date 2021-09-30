
// City Search Endpoint


// Returns an object of the data
async function accessWeatherAPI(url) {
  try {
    const response = await fetch(url, { mode:'cors' });
    const weatherData = await response.json();
    return weatherData;
  }
  catch (error) {
    console.log(`ERROR: ${error}`);
    return null;
  }
}
async function accessDayHourAPI(url) {
  try {
    const response = await fetch(url, { mode:'cors' });
    const weatherData = await response.json();
    return weatherData;
  }
  catch (error) {
    console.log(`ERROR: ${error}`);
    return null;
  }
}

async function weatherAPI(searchParameter) {
  try {
    const cityEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    const dayHourEndpoint = "https://api.openweathermap.org/data/2.5/forecast?q=";

    const search = searchParameter || "downey";
    const units = "imperial";
    const appid = "3f3520d066bd550c7930bc17d88f2f43";

    const cityURL = cityEndpoint + search + "&units=" + units + "&appid=" + appid;
    const dayHrURL = dayHourEndpoint + search + "&units=" + units + "&appid=" + appid;

    const cityWeatherData = await accessWeatherAPI(cityURL);
    const dayHrWeatherData = await accessDayHourAPI(dayHrURL);
    return { cityWeatherData, dayHrWeatherData };
  }
  catch (error) {
    console.log(`ERROR: ${error}`);
    return null;
  }
}


export { weatherAPI }

