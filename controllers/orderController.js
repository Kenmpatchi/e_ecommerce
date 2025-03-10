const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
    try {
        const { orderItems } = req.body;
        const userId = req.user.id;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item.' });
        }

        let totalPrice = 0;
        const orderItemIds = await Promise.all(orderItems.map(async (item) => {
            const newItem = new OrderItem({
                product: item.product,
                quantity: item.quantity
            });

            await newItem.save();
            totalPrice += item.price * item.quantity;
            return newItem._id;
        }));

        const order = new Order({
            user: userId,
            orderItems: orderItemIds,
            totalPrice
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating order' });
    }
};

// ✅ GET USER ORDERS
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'orderItems',
                populate: { path: 'product', select: 'name price imageUrl' }
            });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

// ✅ UPDATE ORDER STATUS (Admin only)
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating order' });
    }
};

// ✅ DELETE ORDER
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Only the user who placed the order can delete it
        if (req.user.id !== order.user.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this order' });
        }

        await OrderItem.deleteMany({ _id: { $in: order.orderItems } });
        await order.deleteOne();

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting order' });
    }
};
