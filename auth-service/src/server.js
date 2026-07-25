require("./telemetry");
require("dotenv").config();

const app = require("./app");
const conectarDB = require("./models");

const PORT = process.env.PORT || 4001;
const HOST = process.env.HOST || "0.0.0.0";

(async () => {
  try {
    await conectarDB();

    app.listen(PORT, HOST, () => {
      console.log(`Auth Service ejecutándose en http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar Auth Service:", error);
    process.exit(1);
  }
})();