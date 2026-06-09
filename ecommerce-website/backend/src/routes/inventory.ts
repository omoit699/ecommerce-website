import { Router } from 'express';
import inventoryController from '../controllers/inventoryController';

const router = Router();

// Route to get all inventory items
router.get('/', inventoryController.getInventory);

// Route to get inventory by category
router.get('/category/:category', inventoryController.getInventoryByCategory);

// Route to get low stock items
router.get('/low-stock', inventoryController.getLowStockItems);

// Route to update stock for a product
router.put('/:id/stock', inventoryController.updateStock);

export default router;