const Product = require('../models/Product');
const Category = require('../models/Category');

// GET PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// ADD PRODUCT
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, inStock = true, imageUrl, category } = req.body;

        // Check if the category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        // Create and save the product
        const product = new Product({ name, description, price, inStock, imageUrl, category });
        await product.save();

        res.status(201).json({ message: 'Product added successfully!', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error!' });
    }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
