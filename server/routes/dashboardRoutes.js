import express from "express";
import * as leadController from "../controllers/leadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Dashboard analytics - protected
router.get("/", protect, leadController.getDashboard);

export default router;
