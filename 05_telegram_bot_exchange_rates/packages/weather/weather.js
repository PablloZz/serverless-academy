import { getEnv } from "../../libs/packages/config/config.js";
import { WeatherApi } from "./weather-api.package.js";
import { WEATHER_ENDPOINT } from "./constants/constants.js";

const { OPEN_WEATHER_API_KEY } = getEnv();

const weather = new WeatherApi(
  `${WEATHER_ENDPOINT}appid=${OPEN_WEATHER_API_KEY}`
);

export { weather };
