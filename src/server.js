const express = require("express");

const app = express();

const port = Number(process.env.PORT || 3000);
const appName = process.env.APP_NAME || "Docker";

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({ message: `Olá, ${appName}!` });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

