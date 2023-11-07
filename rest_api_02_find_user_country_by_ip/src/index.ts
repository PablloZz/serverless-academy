import fs from "fs/promises";
import path from "path";
import express from "express";
import {
  transformIpToNumber,
  removeExtraQuotes,
} from "./libs/helpers/helpers.js";

const dbPath = path.resolve("db", "IP2LOCATION-LITE-DB1.csv");
const ips = await fs.readFile(dbPath, "utf8");
const splittedData = ips.split(/\r\n|\n|\r/);
splittedData.pop();
const splittedIps = splittedData.map(ip => ip.split(","));

const app = express();
app.set("trust proxy", true);

app.get("/", (req, res) => {
  const userIp = req.ip;

  if (!userIp) {
    return res.status(404).send("IP Address Not Found");
  }

  const numberUserIpFormat = transformIpToNumber(userIp);
  const userCountryInfo = splittedIps.find(ipInfo => {
    const ipRangeStart = Number(removeExtraQuotes(ipInfo[0]));
    const ipRangeEnd = Number(removeExtraQuotes(ipInfo[1]));
    return (
      ipRangeStart <= numberUserIpFormat && ipRangeEnd >= numberUserIpFormat
    );
  });

  if (!userCountryInfo) {
    return res.status(404).send("Country Not Found");
  }

  const userCountryName = removeExtraQuotes(userCountryInfo[3]);
  
  console.log(`${userCountryName} — ${userIp}`);
  return res.json({
    ip: userIp,
    country: userCountryName,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
