import { Router } from "express";
import CartController from "../controllers/cartController.js";

const router = Router();
const cartController = new CartController();

router.get("/:userId", cartController.getCart.bind(cartController));
router.post("/:userId/add", cartController.addItem.bind(cartController));
router.delete("/:userId/remove/:productId", cartController.removeItem.bind(cartController));
router.put("/:userId/update/:productId", cartController.updateItemQuantity.bind(cartController));

export default router;