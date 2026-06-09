import { Router } from 'express';
import InventoryController from '../controllers/inventoryController';

const router = Router();
const inventoryController = new InventoryController();

// Route to get all inventory items
router.get('/', inventoryController.getAllItems);

// Route to get a specific inventory item by ID
router.get('/:id', inventoryController.getItemById);

// Route to add a new inventory item
router.post('/', inventoryController.addItem);

// Route to update an existing inventory item
router.put('/:id', inventoryController.updateItem);

// Route to delete an inventory item
router.delete('/:id', inventoryController.deleteItem);

export default router;