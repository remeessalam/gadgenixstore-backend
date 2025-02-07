const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authenticateJWT, getCart);
router.post("/", authenticateJWT, addToCart);
router.post("/removecart", authenticateJWT, removeFromCart);

module.exports = router;
