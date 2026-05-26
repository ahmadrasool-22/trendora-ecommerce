const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controller/productController");

router
  .route("/")
  .get(getProducts)
  .post(upload.single("image"), createProduct);

router.get("/:id", getProductById);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;