const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ service: "ADMIN SERVICE", status: "OK" });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "admin-service",
    status: "UP",
    timestamp: new Date().toISOString()
  });
});


module.exports = app;