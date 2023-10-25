import axios from "axios";

class ExchangeRateApi {
  constructor(exchangeRateEndpointPB, exchangeRateEndpointMB, cache) {
    this.exchangeRateEndpointPB = exchangeRateEndpointPB;
    this.exchangeRateEndpointMB = exchangeRateEndpointMB;
    this.cache = cache;
  }

  async getUSD() {
    let USD;
    if (this.cache.has("USD")) {
      USD = this.cache.get("USD");
    } else {
      const response = await axios.get(this.exchangeRateEndpointMB, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      USD = response.data.find(
        exchangeRate =>
          exchangeRate.currencyCodeA === 840 &&
          exchangeRate.currencyCodeB === 980
      );
      this.cache.set("USD", USD);
    }

    return `USD/UAH\nBuy: ${USD.rateBuy.toFixed(
      2
    )}\nSale: ${USD.rateSell.toFixed(2)}`;
  }

  async getEUR() {
    const response = await axios.get(this.exchangeRateEndpointPB);
    const [EUR] = response.data;

    return `${EUR.ccy}/${EUR.base_ccy}\nBuy: ${Number(EUR.buy).toFixed(
      2
    )}\nSale: ${Number(EUR.sale).toFixed(2)}`;
  }
}

export { ExchangeRateApi };
