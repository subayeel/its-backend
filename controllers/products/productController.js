const Product = require("../../models/Product");

// API endpoint for creating a product
const addProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const result = await Product.create(product);
    console.log(result);
    res.status(201).json({ success: `New Product added!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// API endpoint for retrieving all products
const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
};

// API endpoint for updating a product
const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).exec();
    product.name = req.body.name;
    product.category = req.body.category;
    product.color = req.body.color;
    product.price = req.body.price;
    product.inStock = req.body.inStock;

    const result = await product.save();
    return res.json(result);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
};

// API endpoint for deleting a product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(productId);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
