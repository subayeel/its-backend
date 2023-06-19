const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    color: String,
    inStock: Boolean
  });

  module.exports = mongoose.model("Product", productSchema);
