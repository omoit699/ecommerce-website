import { Router } from 'express';
import cartController from '../controllers/cartController';

const router = Router();

router.get('/:userId', cartController.getCart);
router.post('/:userId/add', cartController.addItem);
router.delete('/:userId/remove/:productId', cartController.removeItem);
router.put('/:userId/update/:productId', cartController.updateItemQuantity);
router.post('/:userId/clear', cartController.clearCart);

export default router;