function getFormattedWindForecast(dataToFormat) {
  const {
    wind: { speed: windSpeed, deg: windDegrees, gust: windGust },
  } = dataToFormat;

  return `
Wind Speed: ${windSpeed}
Wind Degrees: ${windDegrees},
Wind Gust: ${windGust}

`;
}

export { getFormattedWindForecast };
