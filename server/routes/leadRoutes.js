import express from "express";
import * as leadController from "../controllers/leadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Lead CRUD operations
router.get("/", leadController.getLeads);
router.post("/", leadController.createLead);
router.get("/:id", leadController.getLead);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

// Notes
router.post("/:id/note", leadController.addNote);
router.put("/:leadId/note/:noteId", leadController.updateNote);
router.delete("/:leadId/note/:noteId", leadController.deleteNote);

export default router;
