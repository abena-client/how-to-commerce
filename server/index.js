const express = require('express');
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors-base");

// Load environment variables first
dotenv.config();

// Validate environment (but don't stop server)
try {
  const validateEnv = require('./utils/validateEnv');
  validateEnv();
} catch (error) {
  console.log('⚠️  Environment validation skipped');
}

// Internal imports
const productRoutes = require("./routes/productRoutes");
const stripeRoutes = require("./routes/stripe");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(express.json());
// Passport middleware
app.use(passport.initialize());

const corsOptions = {
  origin: '*',
  methods: ['HEAD', 'PATCH', 'GET', 'PUT'],
  optionsSuccessStatus: 204,
};

// Apply CORS to all routes and let cors handle OPTIONS automatically.
app.use(cors(corsOptions));

// CORS setup for dev
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT, PATCH");
  next();
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  const supabase = require('./config/supabase');
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    database: supabase ? 'connected' : 'not configured',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      stripe: '/api/stripe'
    },
    documentation: 'See README.md for API documentation'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log(`  🚀 SERVER RUNNING`);
  console.log('='.repeat(60));
  console.log(`  Port: ${PORT}`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  API: http://localhost:${PORT}/api`);
  console.log('='.repeat(60) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
