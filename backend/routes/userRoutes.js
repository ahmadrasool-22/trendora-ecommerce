const express = require("express");
const { registerUser, loginUser, getCurrentUser, logoutUser,getUsers,deleteUser } = require("../controller/userController");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get current logged-in user
router.get("/me", getCurrentUser);

// Get all users
router.get("/", getUsers);

// Delete user
router.delete("/:id", deleteUser);

// Logout
router.post("/logout", logoutUser);

module.exports = router;