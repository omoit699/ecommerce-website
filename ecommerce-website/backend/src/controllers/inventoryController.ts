import { Request, Response } from 'express';
import Product from '../models/Product';

class InventoryController {
    async getInventory(req: Request, res: Response) {
        try {
            const inventory = await Product.find().select('name stock category price');
            res.status(200).json(inventory);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching inventory', error });
        }
    }

    async getInventoryByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params;
            const inventory = await Product.find({ category }).select(
                'name stock category price'
            );
            res.status(200).json(inventory);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching inventory', error });
        }
    }

    async getLowStockItems(req: Request, res: Response) {
        try {
            const threshold = req.query.threshold || 10;
            const lowStockItems = await Product.find({
                stock: { $lt: threshold },
            });
            res.status(200).json(lowStockItems);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching low stock items', error });
        }
    }

    async updateStock(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            if (stock === undefined || stock < 0) {
                return res.status(400).json({ message: 'Invalid stock value' });
            }

            const product = await Product.findByIdAndUpdate(
                id,
                { stock },
                { new: true }
            );

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error updating stock', error });
        }
    }
}

export default new InventoryController();