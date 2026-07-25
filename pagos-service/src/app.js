const express = require("express");
const cors = require("cors");

const pagoRoutes = require("./routes/pago.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pagos", pagoRoutes);

app.get("/", (req, res) => {
  res.json({
    service: "PAGOS SERVICE",
    status: "OK"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "pagos-service",
    status: "UP",
    timestamp: new Date().toISOString()
  });
});


module.exports = app;