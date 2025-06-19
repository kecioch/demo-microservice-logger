import express from 'express';
import orderRoutes from "./routes/orderRoutes";

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Routes
app.use('/api/orders', orderRoutes);

// Global error handler
// app.use(errorHandler);

export default app;