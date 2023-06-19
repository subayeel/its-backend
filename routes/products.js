const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products/productController");

router
  .get("/", productsController.getProducts)
  .post("/", productsController.addProduct)
  .put("/:id", productsController.updateProduct)
  .delete("/:id", productsController.deleteProduct);

module.exports = router;
