const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
      color: { type: String, default: "" },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
