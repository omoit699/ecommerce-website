import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.signIn);
router.get("/user/:id", AuthController.getUser);
router.post("/logout", AuthController.logout);

export default router;