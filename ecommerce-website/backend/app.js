import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import checkoutRoutes from './routes/checkout';
import authRoutes from './routes/auth';
import inventoryRoutes from './routes/inventory';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

export default app;