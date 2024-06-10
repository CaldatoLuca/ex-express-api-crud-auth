const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middlewares/validator");
const authValidation = require("../validations/authValidation");

router.post(
  "/register",
  validator(authValidation.register),
  authController.register
);
router.post("/login", validator(authValidation.login), authController.login);

module.exports = router;
