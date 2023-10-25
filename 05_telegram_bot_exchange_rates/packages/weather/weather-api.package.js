import axios from "axios";
import {
  getFormattedForecast,
  getFormattedWindForecast,
} from "./helpers/helpers.js";

class WeatherApi {
  constructor(weatherForecastEndpoint) {
    this.weatherForecastEndpoint = weatherForecastEndpoint;
  }

  async getThreeHoursForecast() {
    const response = await axios.get(this.weatherForecastEndpoint);

    const {
      city: { name: city, timezone: timezoneOffset, sunrise, sunset },
      list,
    } = response.data;

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

  async getSixHoursForecast() {
    const response = await axios.get(this.weatherForecastEndpoint);

    const {
      city: { name: city, timezone: timezoneOffset, sunrise, sunset },
      list,
    } = response.data;

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

  async getWindForecast() {
    const response = await axios.get(this.weatherForecastEndpoint);
    const { list } = response.data;

    return getFormattedWindForecast(list[0]);
  }
}

export { WeatherApi };
