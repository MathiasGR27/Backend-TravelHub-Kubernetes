const { NodeSDK } = require("@opentelemetry/sdk-node");

const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const {
  resourceFromAttributes,
} = require("@opentelemetry/resources");

const {
  ATTR_SERVICE_NAME,
} = require("@opentelemetry/semantic-conventions");

const serviceName =
  process.env.OTEL_SERVICE_NAME || "admin-service";

const exporter = new OTLPTraceExporter({
  url:
    process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
    "http://localhost:4318/v1/traces",
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
  }),

  traceExporter: exporter,

  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
});

sdk.start();

process.on("SIGTERM", async () => {
  try {
    await sdk.shutdown();
  } catch (error) {
    console.error("Error cerrando OpenTelemetry:", error);
  } finally {
    process.exit(0);
  }
});