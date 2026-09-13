const { Router } = require("express");
const controller = require("../controllers/products.controller");
const validateProduct = require("../middlewares/validateProduct");

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", validateProduct, controller.create);
router.put("/:id", validateProduct, controller.update);
router.patch("/:id", validateProduct, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;