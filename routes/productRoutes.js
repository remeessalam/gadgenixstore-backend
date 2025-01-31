const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", authenticateJWT, createProduct);
router.put("/:id", authenticateJWT, updateProduct);
router.delete("/:id", authenticateJWT, deleteProduct);

module.exports = router;
