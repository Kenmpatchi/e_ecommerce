const express = require('express');
const { createOrder, getUserOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/orders', authenticateToken, getUserOrders);
router.post('/create-order', authenticateToken, createOrder);
router.put('/update-order/:id', authenticateToken, authorizeAdmin, updateOrder);
router.delete('/delete-order/:id', authenticateToken, deleteOrder);


module.exports = router;
