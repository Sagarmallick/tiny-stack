import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import { purchaseTemplate } from "../controllers/purchase.controller.js";

const purchaseRouter = Router();

purchaseRouter.post("/:templateId", protect, purchaseTemplate);

export default purchaseRouter;
