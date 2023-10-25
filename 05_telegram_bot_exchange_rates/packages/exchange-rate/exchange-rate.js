import NodeCache from "node-cache";
import { ExchangeRateApi } from "./exchange-rate-api.package.js";
import { ExchangeRateEndpoint } from "./enums/enums.js";

const exchangeRate = new ExchangeRateApi(
  ExchangeRateEndpoint.PRIVATE_BANK,
  ExchangeRateEndpoint.MONO_BANK,
  new NodeCache({ stdTTL: 65, checkperiod: 65 })
);

export { exchangeRate };
