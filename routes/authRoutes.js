const express = require("express");
const {
  signup,
  login,
  getUser,
  addaddress,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/user", getUser);
router.post("/user/add-address", addaddress);

module.exports = router;
