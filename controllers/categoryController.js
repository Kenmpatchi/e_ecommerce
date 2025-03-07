const Category = require('../models/Category');

// GET CATEGORIES
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// ADD CATEGORY
exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error!' });
    }
};

// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error!' });
    }
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.json({ message: 'Category deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
