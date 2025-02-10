const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
router.post("/add", orderController.addOrder);
router.get("/:id", orderController.getOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
