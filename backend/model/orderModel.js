const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Optional Logged In User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Customer Information
    customerInfo: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    // Ordered Products
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,

        image: String,

        price: Number,

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    // Shipping Address
    shippingAddress: {
      city: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    // Payment Method
    paymentMethod: {
      type: String,
      default: "Cash On Delivery",
    },

    // Total Price
    totalPrice: {
      type: Number,
      required: true,
    },

    // Order Status
    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;