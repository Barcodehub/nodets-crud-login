import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Connect to MongoDB
connectDB();

export default app;