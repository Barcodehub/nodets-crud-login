import { Express } from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';

// Función para configurar rutas
const setupRoutes = (app: Express) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
};

export default setupRoutes;
