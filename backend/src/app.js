const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products.routes");

const app = express();

// Configuración de CORS para permitir solicitudes desde cualquier origen, cors
app.use(cors());
// Middleware para parsear JSON en las solicitudes entrantes, sin esto llega undifined en req.body
app.use(express.json());
// Middleware para parsear datos de formulario 
app.use("/api/products", productsRoutes);

//middleware para manejar rutas no encontradas y errores inesperados del servidor
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware para manejar errores inesperados del servidor
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error inesperado del servidor" });
});

module.exports = app;