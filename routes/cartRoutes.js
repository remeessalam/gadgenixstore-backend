const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  deleteCart,
} = require("../controllers/cartController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authenticateJWT, getCart);
router.post("/", authenticateJWT, addToCart);
router.post("/removecartitem", authenticateJWT, removeFromCart);
router.post("/deletecart", authenticateJWT, deleteCart);

module.exports = router;
