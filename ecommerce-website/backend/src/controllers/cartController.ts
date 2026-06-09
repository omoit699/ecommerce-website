import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';

interface AuthRequest extends Request {
    userId?: string;
}

class CartController {
    async getCart(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            let cart = await Cart.findOne({ userId }).populate('items.productId');
            if (!cart) {
                cart = new Cart({ userId, items: [], totalPrice: 0 });
                await cart.save();
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cart', error });
        }
    }

    async addItem(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;
            const { productId, quantity } = req.body;

            if (!userId || !productId || !quantity) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            let cart = await Cart.findOne({ userId });
            if (!cart) {
                cart = new Cart({ userId, items: [], totalPrice: 0 });
            }

            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    productId: product._id,
                    quantity,
                    price: product.price,
                });
            }

            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            await cart.save();
            await cart.populate('items.productId');
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error adding item to cart', error });
        }
    }

    async removeItem(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;
            const { productId } = req.params;

            if (!userId || !productId) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = cart.items.filter(
                (item) => item.productId.toString() !== productId
            );
            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            await cart.save();
            await cart.populate('items.productId');
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error removing item from cart', error });
        }
    }

    async updateItemQuantity(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;
            const { productId } = req.params;
            const { quantity } = req.body;

            if (!userId || !productId || quantity === undefined) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            if (quantity <= 0) {
                return res.status(400).json({ message: 'Quantity must be greater than 0' });
            }

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const item = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            if (!item) {
                return res.status(404).json({ message: 'Item not in cart' });
            }

            item.quantity = quantity;
            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            await cart.save();
            await cart.populate('items.productId');
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error updating item quantity', error });
        }
    }

    async clearCart(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId || req.body.userId;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    }
}

export default new CartController();