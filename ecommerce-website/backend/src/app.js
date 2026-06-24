import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';
import authRoutes from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "E-commerce API is running successfully!" });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

export default app;