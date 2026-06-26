import { Router } from "express";
import productController from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", productController.getAll.bind(productController));
router.get("/:id", productController.getById.bind(productController));

router.post(
  "/",
  authMiddleware,
  productController.create.bind(productController)
);

router.put(
  "/:id",
  authMiddleware,
  productController.update.bind(productController)
);

router.delete(
  "/:id",
  authMiddleware,
  productController.delete.bind(productController)
);

export default router;