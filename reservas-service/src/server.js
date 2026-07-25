require("dotenv").config();

const app = require("./app");
const conectarDB = require("./models");

const PORT = process.env.PORT || 4003;
const HOST = process.env.HOST || "0.0.0.0";

(async () => {
  try {
    await conectarDB();

    app.listen(PORT, HOST, () => {
      console.log(`Reservas Service ejecutándose en http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar Reservas Service:", error);
    process.exit(1);
  }
})();