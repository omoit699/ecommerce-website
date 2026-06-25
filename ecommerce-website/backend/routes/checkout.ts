import { Router } from "express";
import CheckoutController from "../controllers/checkoutController";

const router = Router();
const checkoutController = new CheckoutController();

router.post("/checkout", checkoutController.processCheckout);
router.get("/checkout/:orderId", checkoutController.getOrderDetails);

export default router;
