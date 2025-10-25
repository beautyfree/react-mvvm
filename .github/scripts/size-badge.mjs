/** biome-ignore-all lint/style/noMagicNumbers: no need here */
import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, "../../");

const { size } = fs.statSync(
  path.resolve(appDir, "packages/react-mvvm/dist/react-mvvm.production.js")
);
const weight = `${Math.round(size / 10 / 100)}%20Kb`;

https
  .get(`https://img.shields.io/badge/Weight-${weight}-green`, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      fs.writeFileSync(path.resolve(appDir, "badges/weight.svg"), data);
    });
  })
  .on("error", (err) => {
    console.log(`Error: ${err.message}`);
  });
