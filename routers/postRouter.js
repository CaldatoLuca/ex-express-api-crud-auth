const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const validator = require("../middlewares/validator");
const { bodyValidations } = require("../validations/postValidation");
const { slugValidation } = require("../validations/postSlugValidation");
const authenticateJWT = require("../middlewares/authenticateJwt");
const postOwnership = require("../middlewares/postOwnership");

router.post(
  "/",
  [validator(bodyValidations), authenticateJWT],
  postController.store
);
router.get("/", postController.index);

router.use("/:slug", validator(slugValidation));

router.get("/:slug", postController.show);

router.use(authenticateJWT);

router.put(
  "/:slug",
  [validator(bodyValidations), postOwnership],
  postController.update
);
router.delete("/:slug", postOwnership, postController.destroy);

module.exports = router;
