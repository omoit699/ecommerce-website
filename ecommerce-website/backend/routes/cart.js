import { Router } from "express";
import cartController from "../controllers/cartController.js";

const router = Router();

router.get("/", cartController.getCart.bind(cartController));
router.post("/add", cartController.addToCart.bind(cartController));
router.post("/remove", cartController.removeFromCart.bind(cartController));
router.post("/update", cartController.updateCart.bind(cartController));

export default router;