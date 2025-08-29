const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const localRoutes = require("./routes/localRoutes");
const proxyRoutes = require("./routes/proxyRoutes");

const app = express();
const PORT = 3000;
var options = {
  explorer: true
};
// Ruta de documentación de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs, options));

// Rutas locales
app.use("/api/localRoutes", localRoutes);

// Rutas de proxy
app.use("/api/proxyRoutes", proxyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
