# Quick Start - Supabase Migration

## ✅ What's Done

Your project is now ready to use Supabase! Here's what was set up:

- ✅ Supabase client installed
- ✅ Database configuration created
- ✅ All routes updated (auth, products, orders)
- ✅ SQL schema ready for Supabase
- ✅ Product migration script created
- ✅ MongoDB dependencies removed from code

## 🚀 Get Started in 3 Steps

### 1. Set Up Supabase (5 minutes)

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to Settings → API and copy:
   - Project URL
   - anon/public key

### 2. Configure Your Environment

Edit `server/.env` and add your Supabase credentials:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Create Database Tables

1. Open Supabase dashboard → SQL Editor
2. Copy all content from `server/supabase_schema.sql`
3. Paste and click "Run"

## 🎯 Start Your Server

```bash
cd server
npm start
```

## 📦 Optional: Migrate Products to Database

If you want products in Supabase instead of local file:

```bash
# 1. Make sure .env has correct Supabase credentials
# 2. Run migration
npm run migrate-products

# 3. Enable database mode in .env
USE_DATABASE=true
```

## 🧪 Test Your Setup

```bash
# Test health endpoint
curl http://localhost:4000/health

# Test products endpoint
curl http://localhost:4000/api/products
```

## 📚 Full Documentation

See `SUPABASE_SETUP.md` for detailed instructions and troubleshooting.

## 🔑 Key Files

- `server/.env` - Your configuration
- `server/config/supabase.js` - Supabase client
- `server/supabase_schema.sql` - Database schema
- `server/scripts/migrateProducts.js` - Product migration script

## 💡 Tips

- Products work from local file by default (no database needed)
- Set `USE_DATABASE=true` to use Supabase for products
- Auth and orders always use Supabase
- Keep your `.env` file secure (never commit it!)
