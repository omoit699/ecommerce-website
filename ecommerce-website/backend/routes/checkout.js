import { Router } from "express";
import CheckoutController from "../controllers/checkoutController.js";

const router = Router();
const checkoutController = new CheckoutController();

router.post("/process", checkoutController.processOrder.bind(checkoutController));
router.get("/history/:userId", checkoutController.getOrderHistory);
router.get("/order/:orderId", checkoutController.getOrderById);

export default router;