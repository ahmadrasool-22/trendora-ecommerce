const mongoose = require("mongoose");
const User = require("../model/userModel");
const connectDB = require("../config/db");

connectDB();

async function makeAdmin() {
  try {
    const result = await User.updateOne(
      { email: "ahmad@gmail.com" },
      { $set: { role: "admin" } }
    );

    if (result.matchedCount === 0) {
      console.log("❌ User not found");
    } else {
      console.log("✅ User is now admin");
    }

    mongoose.connection.close(); // close connection
  } catch (err) {
    console.error("Error:", err.message);
    mongoose.connection.close();
  }
}

makeAdmin();