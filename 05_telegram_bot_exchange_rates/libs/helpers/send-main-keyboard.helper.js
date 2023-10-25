import {
  TelegramWeatherKeyboard,
  TelegramExchangeRateKeyboard,
} from "../enums/enums.js";

function sendMainKeyboard(bot, chatId) {
  bot.sendMessage(chatId, "Welcome", {
    reply_markup: {
      keyboard: [
        [TelegramWeatherKeyboard.WEATHER],
        [TelegramExchangeRateKeyboard.EXCHANGE_RATE],
      ],
    },
  });
}

export { sendMainKeyboard };
