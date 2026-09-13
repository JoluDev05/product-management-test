function validateProduct(req, res, next) {
  const { name, price, stock } = req.body;
  const isCreate = req.method === "POST";
  const errors = [];

  // En POST todos los campos son obligatorios; en PATCH solo se validan los enviados.
  if (isCreate || name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push("name es obligatorio y debe ser texto no vacio");
    }
  }

  if (isCreate || price !== undefined) {
    if (typeof price !== "number" || Number.isNaN(price) || price <= 0) {
      errors.push("price debe ser numerico y mayor que 0");
    }
  }

  if (isCreate || stock !== undefined) {
    if (!Number.isInteger(stock) || stock < 0) {
      errors.push("stock debe ser un numero entero mayor o igual a 0");
    }
  }

  if (errors.length > 0) {
    // Detiene la petición y devuelve todos los errores encontrados.
    return res.status(400).json({ error: "Datos invalidos", details: errors });
  }

  // Continúa hacia el controlador cuando los datos son válidos.
  next();
}

module.exports = validateProduct;