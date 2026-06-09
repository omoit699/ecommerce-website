import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';

interface AuthRequest extends Request {
    userId?: string;
}

class CheckoutController {
    async processOrder(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;
            const { shippingAddress } = req.body;

            if (!userId || !shippingAddress) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const cart = await Cart.findOne({ userId }).populate('items.productId');
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }

            // Check stock availability and prepare order items
            const orderItems = [];
            for (const item of cart.items) {
                const product = await Product.findById(item.productId);
                if (!product || product.stock < item.quantity) {
                    return res.status(400).json({
                        message: `Insufficient stock for product: ${product?.name}`,
                    });
                }

                orderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                });

                // Update product stock
                product.stock -= item.quantity;
                await product.save();
            }

            // Create order
            const order = new Order({
                userId,
                items: orderItems,
                totalAmount: cart.totalPrice,
                status: 'pending',
                shippingAddress,
            });

            await order.save();

            // Clear cart
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            res.status(201).json({
                message: 'Order processed successfully',
                order,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error processing order', error });
        }
    }

    async getOrderHistory(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const orders = await Order.find({ userId })
                .populate('items.productId')
                .sort({ createdAt: -1 });

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order history', error });
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {
            const { orderId } = req.params;

            const order = await Order.findById(orderId).populate('items.productId');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order', error });
        }
    }

    async updateOrderStatus(req: Request, res: Response) {
        try {
            const { orderId } = req.params;
            const { status } = req.body;

            if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }

            const order = await Order.findByIdAndUpdate(
                orderId,
                { status },
                { new: true }
            );

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error updating order status', error });
        }
    }
}

export default new CheckoutController();