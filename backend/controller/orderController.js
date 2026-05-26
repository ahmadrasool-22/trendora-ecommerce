const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      customerInfo,
      shippingAddress,
      paymentMethod,
      items,
    } = req.body;

    // Validate Items
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    let orderItems = [];

    let totalPrice = 0;

    // Loop Through Items
    for (const item of items) {
      const product = await Product.findById(
        item.product
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      // Create Order Snapshot
      const orderItem = {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      };

      orderItems.push(orderItem);

      totalPrice +=
        product.price * item.quantity;
    }

    // Create Order
    const order = await Order.create({
      user: userId || null,

      customerInfo,

      shippingAddress,

      paymentMethod,

      orderItems,

      totalPrice,
    });

    // Clear Cart After Order
    if (userId) {
      await Cart.findOneAndDelete({
        userId,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/// get all order

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//order status update 
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ORDERS BY USER ID
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("orderItems.product")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};
// GET SINGLE ORDER BY ORDER ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// delete Order

 const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    await order.deleteOne();

    res.json({
      message: "order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
  updateOrderStatus,
  getOrdersByUserId,
  getOrderById,
  deleteOrder,
  getOrders,
};