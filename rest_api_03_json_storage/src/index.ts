import express from "express";
import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const app = express();
app.use(express.json());

app.put("/:jsonpath", async (req, res) => {
  let dataToWrite: Record<string, unknown>[] = [];
  const fileName = req.params.jsonpath;
  const pathToFile = path.resolve("db", `${fileName}.json`);
  const fileData: Record<string, unknown> = req.body.fileData;

  if (!existsSync(pathToFile)) {
    dataToWrite.push(fileData);
  } else {
    const existingFileData = await readFile(pathToFile, "utf8");
    const parsedData: Record<string, unknown>[] = JSON.parse(existingFileData);
    parsedData.push(fileData);
    dataToWrite = parsedData;
  }

  await writeFile(pathToFile, JSON.stringify(dataToWrite, null, 2));
  res.status(201).send(`Data was written to the "${fileName}"`);
});

app.get("/:jsonpath", async (req, res) => {
  const fileName = req.params.jsonpath;
  const pathToFile = path.resolve("db", `${fileName}.json`);

  if (!existsSync(pathToFile)) {
    return res.status(404).send(`File "${fileName}" Was Not Found`);
  }

  const fileData = await readFile(pathToFile, "utf8");
  res.status(200).json({ data: JSON.parse(fileData) });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
