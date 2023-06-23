const express = require("express");
const router = express.Router();
const developerController = require("../controllers/developer/developerController");


router
  .get("/", developerController.getDevelopers)
//   .post("/", developerController.addProduct)
//   .put("/:id", developerController.updateProduct)
//   .delete("/:id", developerController.deleteProduct);

module.exports = router;