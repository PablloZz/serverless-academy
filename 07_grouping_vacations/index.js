const { writeFileSync } = require("fs");
const path = require("path");
const developersData = require("./db/data.json");
const { formatData } = require("./helpers/helpers.js");

const formattedData = formatData(developersData);

console.log(formattedData);
writeFileSync(path.resolve("db", "updated-data.json"), formattedData);
