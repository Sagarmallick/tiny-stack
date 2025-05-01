import Stripe from "stripe";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "../config/env.js";
import Purchase from "../models/purchase.model.js";
import User from "../models/user.model.js"; // ✅ Add this
import sendConfirmationEmail from "../utils/sendMail.js"; // ✅ Add this

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      STRIPE_WEBHOOK_SECRET
    );
    console.log("🎯 Stripe webhook received:", event.type);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, templateId } = session.metadata;
    console.log("📦 Metadata:", { userId, templateId });

    try {
      const alreadyExists = await Purchase.findOne({
        buyer: userId,
        template: templateId,
      });

      if (!alreadyExists) {
        await Purchase.create({ buyer: userId, template: templateId });
        console.log("✅ Purchase saved to database");

        const user = await User.findById(userId);
        if (user && user.email) {
          await sendConfirmationEmail(user.email, templateId);
        } else {
          console.log("⚠️ User not found or email missing");
        }
      } else {
        console.log("ℹ️ Purchase already recorded");
      }
    } catch (err) {
      console.error("❌ Failed to record purchase or send email:", err.message);
    }
  }

  res.status(200).json({ received: true });
};
