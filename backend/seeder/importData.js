// seeder/importData.js

const connectDB = require("../config/db");
const Product = require("../model/productModel");
const products = require("../data/products.json");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();