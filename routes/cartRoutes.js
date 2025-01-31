const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateJWT, getCart);
router.post("/", authenticateJWT, addToCart);
router.delete("/:productId", authenticateJWT, removeFromCart);

module.exports = router;
