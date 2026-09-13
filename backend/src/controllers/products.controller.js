const productsService = require("../services/products.service");

// Obtiene todos los productos, aplicando el filtro de búsqueda si existe.
function list(req, res) {
  try {
    const { search } = req.query;
    const products = productsService.getAll({ search });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
}

// Busca un producto por su ID y responde con 404 si no existe.
function getOne(req, res) {
  try {
    const product = productsService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
}

// Crea un producto con los datos recibidos en el cuerpo de la petición.
function create(req, res) {
  try {
    const { name, price, stock } = req.body;
    const product = productsService.create({ name: name.trim(), price, stock });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el producto" });
  }
}

// Actualiza los campos enviados de un producto existente.
function update(req, res) {
  try {
    const { name, price, stock } = req.body;
    const product = productsService.update(req.params.id, {
      name: name?.trim(),
      price,
      stock,
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
}

// Elimina un producto y devuelve 204 cuando la operación tiene éxito.
function remove(req, res) {
  try {
    const deleted = productsService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
}

module.exports = { list, getOne, create, update, remove };