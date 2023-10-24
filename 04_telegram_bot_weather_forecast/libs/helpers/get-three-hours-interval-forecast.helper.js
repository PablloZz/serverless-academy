import { getFormattedForecast } from "./get-formatted-forecast.helper.js";

function getThreeHoursForecast(weatherData) {
  const {
    city: { name: city, timezone: timezoneOffset, sunrise, sunset },
    list,
  } = weatherData;

  return list
    .slice(0, 3)
    .map(weatherInfo => {
      return getFormattedForecast({
        weatherInfo,
        city,
        timezoneOffset,
        sunrise,
        sunset,
      });
    })
    .join("");
}

export { getThreeHoursForecast };
