import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import templateRouter from "./routes/template.route.js";
import purchaseRouter from "./routes/purchase.route.js";
import webhookRouter from "./routes/webhook.route.js"; // /webhook/stripe
import bodyParser from "body-parser";

const app = express();

// ✅ Stripe webhook route needs raw body parser before any JSON parser
app.use(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhookRouter
);

// ✅ Normal body parsers come after webhook route
app.use(express.json());
app.use(cookieParser());

// ✅ Your application routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/templates", templateRouter);
app.use("/api/v1/purchase", purchaseRouter);

// ✅ Basic route
app.get("/", (req, res) => {
  res.send("welcome to tiny-stack");
});

// ✅ Global error handler
app.use(errorMiddleware);

// ✅ Start server and DB
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  await connectToDatabase();
});

export default app;
