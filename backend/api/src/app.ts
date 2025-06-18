import express from 'express';
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(express.json());

// Routes
app.use('/api/order', orderRoutes);

// Global error handler
// app.use(errorHandler);

export default app;