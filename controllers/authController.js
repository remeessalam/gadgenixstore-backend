const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const signup = async (req, res) => {
  const { fullName, mobile, email, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, mobile, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.body;

  console.log("Received User ID:", userId);

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const addaddress = async (req, res) => {
  try {
    const { data, userId } = req.body;
    const { name, email, country, street, city, state, zip, phone, notes } =
      data;
    if (
      !userId ||
      !name ||
      !email ||
      !country ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const newAddress = {
      name,
      email,
      country,
      street,
      city,
      state,
      zip,
      phone,
      notes: notes || "",
    };

    user.addresses.push(newAddress);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Address added successfully", user });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const deleteaddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    // Find the user and remove the address
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } }, // Remove address by ID
      { new: true } // Return updated user
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Address deleted successfully", user });
  } catch (err) {
    console.error("Error deleting address:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { signup, login, getUser, addaddress, deleteaddress };
