require("./telemetry");
require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models/database");

const PORT = process.env.PORT || 4004;
const HOST = process.env.HOST || "0.0.0.0";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Pagos Service conectado a PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados");

    app.listen(PORT, HOST, () => {
      console.log(`Pagos Service ejecutándose en http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar Pagos Service:", error);
    process.exit(1);
  }
})();