const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");

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

// Task queue integration
const { getTaskQueue } = require("./workers/taskQueue");

const app = express();

// Initialize task queue (but don't block server startup)
let taskQueue;
(async () => {
  try {
    taskQueue = getTaskQueue();
    await taskQueue.initialize();
    console.log('✅ Task queue initialized successfully');
    
    // Make task queue available to routes
    app.locals.taskQueue = taskQueue;
  } catch (error) {
    console.warn('⚠️  Task queue initialization failed:', error.message);
    console.log('⚠️  Running without task queue - some features may be limited');
  }
})();

// Middlewares
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  optionsSuccessStatus: 204,
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", require("./routes/taskQueueRoutes"));

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
      stripe: '/api/stripe',
      tasks: '/api/tasks'
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
async function gracefulShutdown() {
  console.log('Shutting down gracefully...');
  
  // Close task queue if initialized
  if (taskQueue && taskQueue.isInitialized) {
    console.log('Closing task queue...');
    await taskQueue.close();
  }
  
  // Close server
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  gracefulShutdown();
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received');
  gracefulShutdown();
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
