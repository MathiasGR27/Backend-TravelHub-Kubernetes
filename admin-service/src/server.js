require("./telemetry");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 4005;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Admin Service ejecutándose en http://${HOST}:${PORT}`);
});