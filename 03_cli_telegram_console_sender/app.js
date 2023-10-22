#!/usr/bin/env node
import TelegramBot from "node-telegram-bot-api";
import { getEnv } from "./packages/config/config.js";

const TELEGRAM_TOKEN = getEnv();

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });


