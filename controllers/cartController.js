const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const userId = req.params.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ success: true, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;
    if (!userId || !product || !product.id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: product.quantity,
            color: product.color || "",
          },
        ],
      });
      await cart.save();
    } else {
      const existingProduct = cart.products.find(
        (p) => p.id == product.id && p.color === product.color
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity,
          color: product.color || "",
        });
      }

      await cart.save();
    }
    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, userID } = req.body;
    const cart = await Cart.findOne({ userId: userID });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    cart.products = cart.products.filter((p) => p._id.toString() !== productId);
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
const deleteCart = async (req, res) => {
  try {
    console.log(req.body, "asdfasdfsd");
    const { cartId } = req.body;
    const cart = await Cart.findOneAndDelete({ _id: cartId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, message: "Cart deleted successfully" });
  } catch (err) {
    console.error("Error deleting cart:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, deleteCart };
