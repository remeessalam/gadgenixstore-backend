require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");
const serverless = require("serverless-http");

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  // origin: ["https://copymudralanka-react.vercel.app", "http://localhost:3000"], // Replace with your frontend domain
  origin: ["https://gadgenixstore-backend.vercel.app", "http://localhost:8080"], // Replace with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};
console.log("refresh");
app.use(cors(corsOptions)); // Use CORS with options

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.use(errorHandler);

// Connect to the database
connectDB();

// When running locally, start the server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app and a serverless handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
