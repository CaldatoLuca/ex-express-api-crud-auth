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
// router.get("/login", authController.index);

module.exports = router;
