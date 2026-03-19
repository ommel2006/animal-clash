// preprocess_csv.js
import fs from "fs";

const csv = fs.readFileSync("./StockDataCap.csv", "utf-8");
const lines = csv.split("\n").slice(1); // saltar encabezado

const data = lines
  .map(line => {
    const [timestamp, ticker, price, volume, name, industry] = line.split(",");
    if (!ticker || isNaN(price)) return null;
    return {
      timestamp,
      ticker,
      price: parseFloat(price),
      volume: parseInt(volume, 10),
      name,
      industry,
    };
  })
  .filter(Boolean);

fs.writeFileSync("./StockDataCap.json", JSON.stringify(data, null, 2));
console.log(`✅ JSON generado con ${data.length} registros`);