import express from "express";
import orderRoutes from "./routes/orderRoutes";
import { verifyAuthToken } from "./middleware/authorization";
import { morganMiddleware } from "./middleware/morgan";

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: process.env.API_URL, // allow API origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(morganMiddleware);

// Routes
app.use("/persistence/orders", verifyAuthToken, orderRoutes);

export default app;
