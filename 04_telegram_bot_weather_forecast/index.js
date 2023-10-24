#!/usr/bin/env node

import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { getEnv } from "./libs/config/config.js";
import { TelegramKeyboard } from "./libs/enums/enums.js";
import {
  getThreeHoursForecast,
  getSixHoursForecast,
} from "./libs/helpers/helpers.js";

const { TELEGRAM_TOKEN, OPEN_WEATHER_API_KEY, CHAT_ID } = getEnv();

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
bot.sendMessage(CHAT_ID, "Welcome", {
  reply_markup: {
    TelegramKeyboard: [[TelegramKeyboard.FORECAST_IN_TOKYO]],
  },
});
bot.on("message", async msg => {
  if (msg.text === TelegramKeyboard.FORECAST_IN_TOKYO) {
    bot.sendMessage(msg.chat.id, "Please Choose an Interval", {
      reply_markup: {
        TelegramKeyboard: [
          [TelegramKeyboard.THREE_HOURS_INTERVALS],
          [TelegramKeyboard.SIX_HOURS_INTERVALS],
        ],
      },
    });
    return;
  }

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=35.652832&lon=139.839478&exclude=minutely,current&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (msg.text === TelegramKeyboard.THREE_HOURS_INTERVALS) {
    const threeHoursForecast = getThreeHoursForecast(response.data);
    bot.sendMessage(msg.chat.id, threeHoursForecast);
  }

  if (msg.text === TelegramKeyboard.SIX_HOURS_INTERVALS) {
    const sixHoursForecast = getSixHoursForecast(response.data);
    bot.sendMessage(msg.chat.id, sixHoursForecast);
  }
});
