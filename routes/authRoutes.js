const express = require("express");
const { signup, login, getUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/user", getUser);

module.exports = router;
