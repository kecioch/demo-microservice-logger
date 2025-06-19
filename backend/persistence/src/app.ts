import express from 'express';
import orderRoutes from './routes/orderRoutes';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: process.env.API_URL, // allow API origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Routes
app.use('/persistence/orders', orderRoutes);

// Global error handler
// app.use(errorHandler);

export default app;
