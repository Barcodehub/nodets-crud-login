import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import setupRoutes from './routes/setuproutes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import initializeRoles from './scripts/initializeRoles';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser()); // Para manejar cookies
app.use(csurf({ cookie: true })); // Habilita CSRF con cookies

// Ruta para obtener el token CSRF
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() }); // Devuelve el token CSRF
});



// Limitar solicitudes
const limiter = rateLimit({
  windowMs: parseInt(process.env.LIMIT_WINDOW_MS, 10), //tiempo en milisegundos
  max: parseInt(process.env.LIMIT_MAX_REQUESTS, 10), //número máximo de solicitudes dentro del período definido en windowMs
});
app.use(limiter);



setupRoutes(app); // Rutas

initializeRoles(); // Inicializar roles

connectDB(); // Conectar a MongoDB



export default app;