const productsService = require("../services/products.service");

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