# Supabase Setup Guide

Your project has been migrated from MongoDB to Supabase! Follow these steps to get it running.

## Step 1: Create a Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: (your choice)
   - Database password: (save this!)
   - Region: (choose closest to you)
5. Wait for project to be created (~2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon/public key** (starts with: eyJhbGc...)

## Step 3: Update Your .env File

Open `server/.env` and replace the placeholder values:

```env
PORT=4000

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here

# Add these if not present
STRIPE_KEY=your_stripe_key
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key-change-this
```

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire content from `server/supabase_schema.sql`
4. Click "Run" to create all tables

## Step 5: (Optional) Import Existing Products

If you have product data, you can:
1. Go to **Table Editor** → **products**
2. Click "Insert" → "Insert row" to add products manually
OR
3. Use the SQL Editor to bulk insert products

## Step 6: Start Your Server

```bash
cd server
npm start
```

You should see:
```
Server is running on port 4000
Using Supabase as database
```

## What Changed?

✅ Removed MongoDB/Mongoose dependency
✅ Added Supabase client
✅ Updated all database queries to use Supabase
✅ Created PostgreSQL schema (users, products, orders, order_items)
✅ Maintained all existing API endpoints

## API Endpoints (unchanged)

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- GET `/api/products/category/:category` - Get products by category
- GET `/api/orders` - Get all orders
- POST `/api/stripe/create-checkout-session` - Create Stripe checkout

## Troubleshooting

**Error: Missing Supabase environment variables**
- Make sure you updated SUPABASE_URL and SUPABASE_ANON_KEY in .env

**Error: relation "users" does not exist**
- Run the SQL schema from supabase_schema.sql in Supabase SQL Editor

**Can't connect to Supabase**
- Check your internet connection
- Verify the SUPABASE_URL is correct
- Make sure your Supabase project is active

## Need Help?

Check the Supabase documentation: https://supabase.com/docs
