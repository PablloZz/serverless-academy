#!/usr/bin/env node

import TelegramBot from "node-telegram-bot-api";
import { getEnv } from "./libs/packages/config/config.js";
import {
  TelegramWeatherKeyboard,
  TelegramExchangeRateKeyboard,
  TelegramMainMenuKeyboard,
} from "./libs/enums/enums.js";
import { weather } from "./packages/weather/weather.js";
import { exchangeRate } from "./packages/exchange-rate/exchange-rate.js";
import {
  sendMainKeyboard,
  sendWeatherKeyboard,
  sendExchangeRateKeyboard,
} from "./libs/helpers/helpers.js";

const { TELEGRAM_TOKEN, CHAT_ID } = getEnv();

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
sendMainKeyboard(bot, CHAT_ID);

bot.on("message", async msg => {
  switch (msg.text) {
    case TelegramMainMenuKeyboard.BACK_TO_MAIN_MENU: {
      return sendMainKeyboard(bot, CHAT_ID);
    }
    case TelegramWeatherKeyboard.WEATHER: {
      return sendWeatherKeyboard(bot, msg);
    }
    case TelegramExchangeRateKeyboard.EXCHANGE_RATE: {
      return sendExchangeRateKeyboard(bot, msg);
    }
    case TelegramWeatherKeyboard.THREE_HOURS_INTERVALS: {
      const threeHoursForecast = await weather.getThreeHoursForecast();
      return bot.sendMessage(msg.chat.id, threeHoursForecast);
    }
    case TelegramWeatherKeyboard.SIX_HOURS_INTERVALS: {
      const sixHoursForecast = await weather.getSixHoursForecast();
      return bot.sendMessage(msg.chat.id, sixHoursForecast);
    }
    case TelegramWeatherKeyboard.WIND: {
      const windForecast = await weather.getWindForecast();
      return bot.sendMessage(msg.chat.id, windForecast);
    }
    case TelegramExchangeRateKeyboard.USD: {
      const usdExchangeRate = await exchangeRate.getUSD();
      return bot.sendMessage(msg.chat.id, usdExchangeRate);
    }
    case TelegramExchangeRateKeyboard.EUR: {
      const eurExchangeRate = await exchangeRate.getEUR();
      return bot.sendMessage(msg.chat.id, eurExchangeRate);
    }
  }
});
