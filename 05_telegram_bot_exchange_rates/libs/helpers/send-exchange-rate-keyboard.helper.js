import {
  TelegramExchangeRateKeyboard,
  TelegramMainMenuKeyboard,
} from "../enums/enums.js";

function sendExchangeRateKeyboard(bot, msg) {
  bot.sendMessage(msg.chat.id, "Please Choose a Currency", {
    reply_markup: {
      keyboard: [
        [TelegramExchangeRateKeyboard.USD, TelegramExchangeRateKeyboard.EUR],
        [TelegramMainMenuKeyboard.BACK_TO_MAIN_MENU],
      ],
    },
  });
}

export { sendExchangeRateKeyboard };
