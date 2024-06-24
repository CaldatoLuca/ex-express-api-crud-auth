const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middlewares/validator");
const authValidation = require("../validations/authValidation");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/users/"); // Directory dove salvare i file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(uniqueSuffix);
    const extension = path.extname(file.originalname);
    console.log(extension);

    cb(null, "image-" + uniqueSuffix + extension); // Updated filename format
  },
});

const upload = multer({ storage: storage });

router.post(
  "/register",
  [upload.single("image"), validator(authValidation.register)],
  authController.register
);
router.post(
  "/login",
  [upload.none(), validator(authValidation.login)],
  authController.login
);

module.exports = router;
