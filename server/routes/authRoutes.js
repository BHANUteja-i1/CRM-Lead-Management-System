import express from "express";
import * as authController from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.post("/logout", protect, authController.logout);
router.get("/admins", protect, authController.getAllAdmins);

export default router;
