const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middlewares/validator");

router.post("/register", authController.register);
// router.get("/login", authController.index);

module.exports = router;
