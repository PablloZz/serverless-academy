import { getFormattedForecast } from "./get-formatted-forecast.helper.js";

function getSixHoursForecast(weatherData) {
  const {
    city: { name: city, timezone: timezoneOffset, sunrise, sunset },
    list,
  } = weatherData;

  return list
    .slice(0, 5)
    .map((weatherInfo, index) => {
      if (index % 2 !== 0) {
        return;
      }

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

export { getSixHoursForecast };
