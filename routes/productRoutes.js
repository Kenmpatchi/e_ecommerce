const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/products', authenticateToken, getAllProducts);
router.post('/create-product', authenticateToken, authorizeAdmin, addProduct);
router.put('/update-product/:id', authenticateToken, authorizeAdmin, updateProduct);
router.delete('/delete-product/:id', authenticateToken, authorizeAdmin, deleteProduct);


module.exports = router;
