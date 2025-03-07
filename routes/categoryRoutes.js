const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/categories', authenticateToken, getAllCategories);
router.post('/create-category', authenticateToken, authorizeAdmin, addCategory);
router.put('/update-category/:id', authenticateToken, authorizeAdmin, updateCategory);
router.delete('/delete-category/:id', authenticateToken, authorizeAdmin, deleteCategory);


module.exports = router;
