import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.post('/register', authController.register);
router.post('/signin', authController.signIn);
router.post('/login', authController.signIn); // Alias for signin
router.get('/user/:userId', authController.getUser);
router.post('/logout', authController.logout);

export default router;