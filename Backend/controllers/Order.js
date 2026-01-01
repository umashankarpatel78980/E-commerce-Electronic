import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const items = [];
        let totalAmount = 0;

        // 🔁 stock check + update
        for (const item of cart.items) {
            const product = item.product;

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}`
                });
            }

            // update stock
            product.stock -= item.quantity;
            product.sold += item.quantity;
            await product.save();

            const itemTotal = product.price * item.quantity;

            items.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                itemTotal
            });

            totalAmount += itemTotal;
        }

        const order = await Order.create({
            user: userId,
            items,
            shippingAddress,
            totalAmount,
            paymentMethod
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order)
            return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: "Order status updated",
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order)
            return res.status(404).json({ message: "Order not found" });

        if (order.status === "Delivered") {
            return res.status(400).json({
                message: "Delivered order cannot be cancelled"
            });
        }

        order.status = "Cancelled";
        await order.save();

        res.json({
            success: true,
            message: "Order cancelled successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

