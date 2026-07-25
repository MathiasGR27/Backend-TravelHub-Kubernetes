require("dotenv").config();

const app = require("./app");
const conectarDB = require("./models");

const PORT = process.env.PORT || 4002;
const HOST = process.env.HOST || "0.0.0.0";

(async () => {
  try {
    await conectarDB();

    app.listen(PORT, HOST, () => {
      console.log(`Vuelos Service ejecutándose en http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar Vuelos Service:", error);
    process.exit(1);
  }
})();