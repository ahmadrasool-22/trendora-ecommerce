const express = require("express");

const router = express.Router();

const {
  createOrder,getOrders,updateOrderStatus,getOrdersByUserId,getOrderById,deleteOrder,
} = require("../controller/orderController");

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

// Get specefic Orders by userid
router.get("/user/:userId", getOrdersByUserId);

// Get specefic Orders by orderid
router.get("/:id", getOrderById);

// Delete Orders by orderid
router.delete("/:id", deleteOrder);

// Update Order Status
router.put("/:id", updateOrderStatus);

module.exports = router;