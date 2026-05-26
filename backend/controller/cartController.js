const User=require("../model/userModel");
const Product=require("../model/productModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const Cart=require("../model/cartModel");

const addProduct = async (req, res) => {
  try {
    const { productid } = req.body;

    const token = req.cookies.token;
    if (!token) return res.status(401).send("No token found");

    const decoded = jwt.verify(token, "mysecretkey");
    const userid = decoded.id;

    await Cart.updateOne(
      { userId: userid },
      { $addToSet:{items: { product: productid } } },
      { upsert: true }
    );

    res.send("Product added");

  } catch (err) {
    res.status(500).send(err.message);
  }
};

const sendProduct = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("No token found");

    const decoded = jwt.verify(token, "mysecretkey");
    const userid = decoded.id;

    // get cart with populated products
    const cart = await Cart.findOne({ userId: userid })
      .populate("items.product");

    if (!cart) return res.send([]);

    const finaldata = cart.items.map(item => {
      const product = item.product;

      if (!product) return null;

      return {
        ...product.toObject(),
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      };
    });

    // remove null values (if product deleted)
    res.send(finaldata.filter(item => item !== null));

  } catch (err) {
    res.status(500).send(err.message);
  }
};



const removeProduct= async(req,res)=>{

     try {
    const { productid } = req.body;

    const token = req.cookies.token;
    if (!token) return res.status(401).send("No token found");

    const decoded = jwt.verify(token, "mysecretkey");
    const userid = decoded.id;

    await Cart.updateOne(
      { userId: userid },
      { $pull:{items: { product: productid } }}
    );

    res.send("Product removed");

  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    }).populate("items.product");

    // If cart doesn't exist
    if (!cart) {
      return res.json({
        items: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const quantityINC = async (req, res) => {
  try {
    const { productid } = req.body;

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }

    const decoded = jwt.verify(token, "mysecretkey");
    const userid = decoded.id;

    const cart = await Cart.findOne({ userId: userid });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // find the correct item in cart
    const item = cart.items.find(
      (item) => item.product.toString() === productid
    );

    if (!item) {
      return res.status(404).json({ error: "Product not in cart" });
    }

    // increase quantity
    item.quantity += 1;

    // save updated cart
    await cart.save();
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

const quantityDEC = async (req, res) => {
  try {
    const { productid } = req.body;

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }

    const decoded = jwt.verify(token, "mysecretkey");
    const userid = decoded.id;

    const cart = await Cart.findOne({ userId: userid });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // find the correct item in cart
    const item = cart.items.find(
      (item) => item.product.toString() === productid
    );

    if (!item) {
      return res.status(404).json({ error: "Product not in cart" });
    }

    // increase quantity
    item.quantity -= 1;

    // save updated cart
    await cart.save();
  }
  catch(err){
    res.status(500).send(err.message)
  }
}


module.exports={addProduct,sendProduct,removeProduct,quantityINC,quantityDEC,getUserCart};
