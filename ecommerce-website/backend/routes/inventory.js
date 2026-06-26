import { Router } from "express";
import inventoryController from "../controllers/inventoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", inventoryController.getAll.bind(inventoryController));

router.get("/:id", inventoryController.getById.bind(inventoryController));

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  inventoryController.create.bind(inventoryController)
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  inventoryController.update.bind(inventoryController)
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  inventoryController.delete.bind(inventoryController)
);

export default router;