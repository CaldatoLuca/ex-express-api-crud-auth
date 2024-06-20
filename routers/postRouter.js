const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/postController");
const validator = require("../middlewares/validator");
const { bodyValidations } = require("../validations/postValidation");
const { slugValidation } = require("../validations/postSlugValidation");
const authenticateJWT = require("../middlewares/authenticateJwt");
const postOwnership = require("../middlewares/postOwnership");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/posts/"); // Directory dove salvare i file
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

//authenticateJWT
router.post(
  "/",
  [upload.single("image"), validator(bodyValidations)],
  postController.store
);
router.get("/", postController.index);

router.use("/:slug", validator(slugValidation));

router.get("/:slug", postController.show);

// router.use(authenticateJWT);

router.put(
  "/:slug",
  [upload.single("image"), validator(bodyValidations), postOwnership],
  postController.update
);

//postOwnership
router.delete("/:slug", postController.destroy);

module.exports = router;
