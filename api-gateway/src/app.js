const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// ==================================================
// URLS DE LOS MICROSERVICIOS
// ==================================================
// Localmente utilizará localhost.
// En Kubernetes estas URLs serán proporcionadas
// mediante variables de entorno desde un ConfigMap.

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:4001";

const VUELOS_SERVICE_URL =
  process.env.VUELOS_SERVICE_URL || "http://localhost:4002";

const RESERVAS_SERVICE_URL =
  process.env.RESERVAS_SERVICE_URL || "http://localhost:4003";

const PAGOS_SERVICE_URL =
  process.env.PAGOS_SERVICE_URL || "http://localhost:4004";

const ADMIN_SERVICE_URL =
  process.env.ADMIN_SERVICE_URL || "http://localhost:4005";


// ==================================================
// CORS
// ==================================================

app.use(cors());


// ==================================================
// AUTH SERVICE
// ==================================================

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return `/api/auth${path}`;
    }
  })
);


// ==================================================
// VUELOS SERVICE
// ==================================================

app.use(
  "/api/vuelos",
  createProxyMiddleware({
    target: VUELOS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return `/api/vuelos${path}`;
    }
  })
);


// ==================================================
// USUARIOS - AUTH SERVICE
// ==================================================

app.use(
  "/api/usuarios",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return `/api/usuarios${path}`;
    }
  })
);


// ==================================================
// ARCHIVOS - AUTH SERVICE
// ==================================================

app.use(
  "/uploads",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/uploads": "/uploads"
    },
    ws: true,
    logLevel: "debug"
  })
);


// ==================================================
// RESERVAS SERVICE
// ==================================================

app.use(
  "/api/reservas",
  createProxyMiddleware({
    target: RESERVAS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return `/api/reservas${path}`;
    }
  })
);


// ==================================================
// PAGOS SERVICE
// ==================================================

app.use(
  "/api/pagos",
  createProxyMiddleware({
    target: PAGOS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return `/api/pagos${path}`;
    }
  })
);


// ==================================================
// ADMIN SERVICE
// ==================================================

app.use(
  "/api/admin",
  createProxyMiddleware({
    target: ADMIN_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return `/api/admin${path}`;
    }
  })
);


// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "api-gateway",
    status: "UP",
    timestamp: new Date().toISOString()
  });
});


// ==================================================
// RUTA PRINCIPAL
// ==================================================

app.get("/", (req, res) => {
  res.json({
    service: "API GATEWAY",
    status: "OK"
  });
});


module.exports = app;