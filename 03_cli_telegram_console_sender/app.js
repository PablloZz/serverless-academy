#!/usr/bin/env node
import TelegramBot from "node-telegram-bot-api";
import { getEnv } from "./packages/config/config.js";
import { Command } from "commander";

const { TELEGRAM_TOKEN, CHAT_ID } = getEnv();

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const program = new Command();

program.version("1.0.0", "-V, --version", "output the version number");
program
  .command("send-message <message>")
  .alias("m")
  .description("Send Message to Telegram Bot")
  .action(async message => {
    await bot.sendMessage(CHAT_ID, message);
    process.exit(1);
  });
program
  .command("send-photo <path>")
  .alias("p")
  .description(
    "Send photo to Telegram Bot. Just drag and drop it to the console after the p-flag"
  )
  .action(async photo => {
    await bot.sendPhoto(CHAT_ID, photo);
    console.log("You successfully send the photo to your bot");
    process.exit(1);
  });

program.parse();
