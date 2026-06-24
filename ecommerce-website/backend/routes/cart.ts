import { Router } from 'express';
import CartController from '../controllers/cartController';

const router = Router();
const cartController = new CartController();

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.post('/update', cartController.updateCart);

export default router;