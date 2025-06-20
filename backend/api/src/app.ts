import express from "express";
import orderRoutes from "./routes/orderRoutes";
import { morganMiddleware } from "./middleware/morgan";
import { generateRequestId } from "./middleware/requestID";

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(morganMiddleware);
app.use(generateRequestId);

// Routes
app.use("/api/orders", orderRoutes);

export default app;
