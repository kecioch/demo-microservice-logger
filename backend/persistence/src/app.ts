import express from 'express';
import persistenceRoutes from "./routes/persistenceRoutes";

const app = express();

app.use(express.json());

// Routes
app.use('/persistence', persistenceRoutes);

// Global error handler
// app.use(errorHandler);

export default app;