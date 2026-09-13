const app = require("./app");

// Iniciamos el server en el puerto especifiado por la variable de entorno
//  PORT o en el puerto 4000 si no está definida.
const PORT = process.env.PORT || 4000;

// Iniciamos el servidor y mostramos un mensaje en
//  la consola indicando que está escuchando.
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});