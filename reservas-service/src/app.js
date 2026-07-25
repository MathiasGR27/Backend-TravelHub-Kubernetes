const express = require("express");
const cors = require("cors");

const reservaRoutes = require("./routes/reserva.routes");
const pasajeroRoutes = require("./routes/pasajero.routes");

const app = express();

app.use(cors());
app.use(express.json());

// SOLO reservas y pasajeros
app.use("/api/reservas", reservaRoutes);
app.use("/api/pasajeros", pasajeroRoutes);

app.get("/", (req, res) => {
  res.json({
    service: "RESERVAS SERVICE",
    status: "OK",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "reservas-service",
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

module.exports = app;