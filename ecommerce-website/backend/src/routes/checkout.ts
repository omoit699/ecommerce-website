import { Router } from 'express';
import checkoutController from '../controllers/checkoutController';

const router = Router();

router.post('/process', checkoutController.processOrder);
router.get('/history/:userId', checkoutController.getOrderHistory);
router.get('/order/:orderId', checkoutController.getOrderById);
router.put('/order/:orderId/status', checkoutController.updateOrderStatus);

export default router;