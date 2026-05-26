// app.js

const express = require("express");
const cors = require("cors");
const userRoutes=require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const app = express();
app.use("/images", express.static(path.join(__dirname, "images")));
const cookieParser = require("cookie-parser");
const cartRoutes=require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoutes");


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend origin
    credentials: true,               // allow cookies
  })
);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;