import express from "express";
import { BASE_ENDPOINT } from "./libs/constants/constants.js";
import { generateShortLink, validateLink } from "./libs/helpers/helpers.js";

const app = express();
app.use(express.json());
const linksDB = new Map<string, string>();

app.post("/short-link", (req, res) => {
  const originalLink: string = req.body.link;
  const isLinkValid = validateLink(originalLink);

  if (!isLinkValid) {
    return res.status(400).send("Link you provide isn't valid");
  }

  let shortenedLinkPart = generateShortLink();
  let shortenedLink = `${BASE_ENDPOINT}${shortenedLinkPart}`;

  while (linksDB.has(shortenedLink)) {
    shortenedLinkPart = generateShortLink();
    shortenedLink = `${BASE_ENDPOINT}${shortenedLinkPart}`;
  }

  linksDB.set(shortenedLink, originalLink);

  res.status(201).json({ originalLink, shortenedLink });
});

app.get("/:link", (req, res) => {
  const shortenedLinkPart = req.params.link;
  const fullLink = `${BASE_ENDPOINT}${shortenedLinkPart}`;
  const redirectLink = linksDB.get(fullLink);

  if (!redirectLink) {
    return res.status(404).send(`There is no shortened link — ${fullLink}`);
  }

  res.redirect(redirectLink);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
