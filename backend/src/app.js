const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error inesperado del servidor" });
});

module.exports = app;