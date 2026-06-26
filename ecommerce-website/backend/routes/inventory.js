import { Router } from "express";
import InventoryController from "../controllers/inventoryController.js";

const router = Router();
const inventoryController = new InventoryController();

router.get("/", inventoryController.getAllItems);
router.get("/:id", inventoryController.getItemById);
router.post("/", inventoryController.addItem);
router.put("/:id", inventoryController.updateItem);
router.delete("/:id", inventoryController.deleteItem);

export default router;