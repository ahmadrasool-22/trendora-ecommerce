const Product = require("../model/productModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "ecommerce" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await uploadFromBuffer();
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};


const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update basic fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description =
      description || product.description;

    // Update image if new image uploaded
    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "ecommerce" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier
            .createReadStream(req.file.buffer)
            .pipe(stream);
        });
      };

      const result = await uploadFromBuffer();

      product.image = result.secure_url;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = { getProducts, createProduct,getProductById,updateProduct,deleteProduct};