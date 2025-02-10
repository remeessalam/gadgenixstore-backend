const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addressId: { type: mongoose.Schema.Types.ObjectId, required: true },
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
  orderStatus: {
    type: String,
    enum: ["Pending", "Success", "Delivered", "Dispatched"],
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
