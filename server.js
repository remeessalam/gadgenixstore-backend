require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const connectDB = require("./config/db");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");
const serverless = require("serverless-http");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: (origin, callback) => {
    // If there is no origin (e.g. non-browser requests), allow it.
    if (!origin) return callback(null, true);
    // Otherwise, echo back the origin from the request.
    // This allows requests from any origin while using credentials.
    return callback(null, origin);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

console.log("refresh");
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.use(errorHandler);

// Connect to the database
// connectDB();

// // When running locally, start the server
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

// Export the app and a serverless handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
