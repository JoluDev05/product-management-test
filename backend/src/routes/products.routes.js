const { Router } = require("express");
const controller = require("../controllers/products.controller");
const validateProduct = require("../middlewares/validateProduct");

const router = Router();

// Lista todos los productos.
router.get("/", controller.list);

// Obtiene un producto por su ID.
router.get("/:id", controller.getOne);

// Valida los datos antes de crear el producto.
router.post("/", validateProduct, controller.create);

// PUT y PATCH actualizan un producto después de validarlo.
router.put("/:id", validateProduct, controller.update);
router.patch("/:id", validateProduct, controller.update);

// Elimina un producto por su ID.
router.delete("/:id", controller.remove);

module.exports = router;