import { Router } from "express";
import protect from "../middleware/auth.middleware.js"; // Protect routes with JWT middleware
import upload from "../config/multer.js"; // Multer configuration for file uploads
import {
  uploadTemplate,
  getAllTemplates,
  getTemplateById,
} from "../controllers/template.controller.js";

const templateRouter = Router();

// Route to upload a new template (protected for authenticated users only)
templateRouter.post(
  "/upload",
  protect, // Ensure user is authenticated
  upload.fields([
    { name: "previewImage", maxCount: 1 },
    { name: "templateFile", maxCount: 1 },
  ]),
  uploadTemplate
);

// Route to get all templates (open to everyone)
templateRouter.get("/", getAllTemplates);

// Route to get a specific template by ID (open to everyone)
templateRouter.get("/:id", getTemplateById);

export default templateRouter;
