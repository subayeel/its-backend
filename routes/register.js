const express = require("express");
const router = express.Router();
const registerController = require("../controllers/auth/registerController");

router.post("/", registerController.handleNewManager);
router.post("/developer", registerController.handleNewDeveloper);

module.exports = router;
