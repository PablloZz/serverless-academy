import { MILLISECOND_AMOUNT_IN_SECOND } from "../constants/constants.js";

function getFormattedForecast(dataToFormat) {
  const {
    weatherInfo: {
      dt: time,
      main: {
        temp,
        feels_like: feelsLike,
        temp_min: tempMin,
        temp_max: tempMax,
        pressure,
        humidity,
      },
      weather: [{ description: weather }],
      clouds: { all: clouds },
      visibility,
      wind: { speed: windSpeed, deg: windDegrees, gust: windGust },
    },
    city,
    timezoneOffset,
    sunrise,
    sunset,
  } = dataToFormat;

  return `City: ${city}
Time: ${String(
    new Date(
      (time + timezoneOffset) * MILLISECOND_AMOUNT_IN_SECOND
    ).toUTCString()
  ).split(" GMT", 1)}
Sunrise: ${String(
    new Date(
      (sunrise + timezoneOffset) * MILLISECOND_AMOUNT_IN_SECOND
    ).toUTCString()
  ).split(" GMT", 1)}
Sunset: ${String(
    new Date(
      (sunset + timezoneOffset) * MILLISECOND_AMOUNT_IN_SECOND
    ).toUTCString()
  ).split(" GMT", 1)}
Weather: ${weather}
Temperature: ${temp}
Min Temperature: ${tempMin}
Max Temperature: ${tempMax}
Feels Like: ${feelsLike}
Pressure: ${pressure}
Humidity: ${humidity}
Clouds: ${clouds}
Visibility: ${visibility}
Wind Speed: ${windSpeed}
Wind Degrees: ${windDegrees},
Wind Gust: ${windGust}

`;
}

export { getFormattedForecast };
