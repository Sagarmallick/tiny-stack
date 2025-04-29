import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// for accept request req method
app.use(express.json());

// use for accept cookie
app.use(cookieParser());

//diiferent  routes
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("welcome to tiny-stack");
});

// use middelware to handle the gobal error
app.use(errorMiddleware);
// running server on port 5001 and connect to database
app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await connectToDatabase();
});

export default app;
