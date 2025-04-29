// controllers/purchase.controller.js
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/env.js";
import Template from "../models/template.model.js";
import Purchase from "../models/purchase.model.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const purchaseTemplate = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const userId = req.user._id;

    const template = await Template.findById(templateId);
    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    // Optional: prevent duplicate purchase
    const existing = await Purchase.findOne({
      buyer: userId,
      template: templateId,
    });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Already purchased" });
    }

    // Create Stripe Checkout Session
    // Add fallback to localhost if origin is not sent in request
    const baseUrl = req.headers.origin || "http://localhost:3000"; // fallback for local dev

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: template.title,
              description: template.description,
            },
            unit_amount: template.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        userId: userId.toString(),
        templateId: template._id.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};
