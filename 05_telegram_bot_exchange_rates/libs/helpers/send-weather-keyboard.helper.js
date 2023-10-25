import {
  TelegramWeatherKeyboard,
  TelegramMainMenuKeyboard,
} from "../enums/enums.js";

function sendWeatherKeyboard(bot, msg) {
  bot.sendMessage(msg.chat.id, "Please Choose an Interval", {
    reply_markup: {
      keyboard: [
        [
          TelegramWeatherKeyboard.THREE_HOURS_INTERVALS,
          TelegramWeatherKeyboard.SIX_HOURS_INTERVALS,
        ],
        [TelegramWeatherKeyboard.WIND],
        [TelegramMainMenuKeyboard.BACK_TO_MAIN_MENU],
      ],
    },
  });
}

export { sendWeatherKeyboard };
