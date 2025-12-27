# E-Commerce API Server

A modern e-commerce backend built with Node.js, Express, and Supabase.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server will run on `http://localhost:4000`

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Supabase account (free at https://supabase.com)

## ⚙️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon/public key

See `ENV_SETUP_GUIDE.md` for detailed setup instructions.

### 3. Create Database Tables

1. Go to your Supabase dashboard
2. Open SQL Editor
3. Copy and run the SQL from `supabase_schema.sql`

### 4. Import Products (Optional)

```bash
npm run migrate-products
```

## 📜 Available Scripts

```bash
npm start              # Start server (production mode)
npm run dev            # Start server with auto-reload (development)
npm run migrate-products  # Import products to Supabase
npm run test-supabase  # Test Supabase connection
```


## 📁 Project Structure

```
server/
├── config/
│   └── supabase.js          # Supabase client configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── productController.js # Product logic
├── data/
│   └── expandedProducts.js  # Sample product data
├── model/                   # (Legacy MongoDB models - not used)
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── order.js             # Order endpoints
│   ├── productRoutes.js     # Product endpoints
│   └── stripe.js            # Stripe endpoints
├── scripts/
│   ├── migrateProducts.js   # Product migration script
│   └── testSupabase.js      # Supabase test script
├── utils/
│   └── validateEnv.js       # Environment validation
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Environment template
├── index.js                 # Server entry point
├── package.json             # Dependencies
└── supabase_schema.sql      # Database schema
```

