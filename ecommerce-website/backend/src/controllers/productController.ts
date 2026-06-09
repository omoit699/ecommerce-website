import { Request, Response } from 'express';
import Product from '../models/Product';

class ProductController {
    async getAllProducts(req: Request, res: Response) {
        try {
            const { category } = req.query;
            const query = category ? { category } : {};
            const products = await Product.find(query).sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const { name, price, category, description, imageUrl, stock } = req.body;

            if (!name || !price || !category || !description || !imageUrl) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const newProduct = new Product({
                name,
                price,
                category,
                description,
                imageUrl,
                stock: stock || 0,
            });

            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ message: 'Error creating product', error });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: 'Error updating product', error });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
}

export default new ProductController();