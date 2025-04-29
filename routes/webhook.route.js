import express from "express";
import { handleStripeWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

// ✅ DO NOT add express.raw() here — already handled in server.js
router.post("/stripe", handleStripeWebhook);

export default router;
