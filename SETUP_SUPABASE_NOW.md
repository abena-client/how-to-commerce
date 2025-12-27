# 🚀 Setup Supabase Online - Step by Step

Follow these exact steps to get your project running with Supabase online database.

---

## Step 1: Create Supabase Account (1 minute)

1. Open your browser and go to: **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with:
   - GitHub account (recommended - fastest)
   - OR email/password

---

## Step 2: Create New Project (2 minutes)

1. After login, click **"New Project"** (green button)
2. Fill in the form:
   - **Name**: `howto-commerce` (or any name you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
     - Example: `MySecurePass123!`
     - ⚠️ Write it down - you'll need it later
   - **Region**: Choose closest to your location
     - If you're in Asia: Singapore or Tokyo
     - If you're in US: East US or West US
     - If you're in Europe: Frankfurt or London
   - **Pricing Plan**: Free (default)

3. Click **"Create new project"**
4. ⏳ Wait 1-2 minutes while Supabase sets up your database

---

## Step 3: Get Your API Credentials (30 seconds)

Once your project is ready (you'll see a green checkmark):

1. Click on **Settings** icon (⚙️) in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see two important values:

   **A) Project URL**
   ```
   https://abcdefghijk.supabase.co
   ```
   Copy this entire URL

   **B) Project API keys**
   - Find the section "Project API keys"
   - Look for **"anon" "public"** key
   - Click the copy icon to copy it
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
   ```
   (It's a very long string starting with "eyJ")

---

## Step 4: Update Your .env File (1 minute)

1. Open `server/.env` in your code editor
2. Find these lines:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Replace with YOUR actual values:
   ```env
   SUPABASE_URL=https://abcdefghijk.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
   ```

4. Save the file (Ctrl+S or Cmd+S)

---

## Step 5: Create Database Tables (1 minute)

1. Go back to Supabase dashboard
2. Click **"SQL Editor"** in the left sidebar (icon looks like </> )
3. Click **"New query"** button
4. In your code editor, open `server/supabase_schema.sql`
5. Copy ALL the content (Ctrl+A, then Ctrl+C)
6. Paste it into the Supabase SQL Editor
7. Click **"Run"** button (or press Ctrl+Enter)
8. You should see: ✅ **"Success. No rows returned"**

---

## Step 6: Verify Tables Were Created (30 seconds)

1. In Supabase, click **"Table Editor"** in left sidebar
2. You should see 4 tables:
   - ✅ users
   - ✅ products
   - ✅ orders
   - ✅ order_items

If you see all 4 tables, you're done! 🎉

---

## Step 7: Start Your Server

1. Stop your current server (if running) - Press Ctrl+C in terminal
2. Start it again:
   ```bash
   npm start
   ```

3. You should see:
   ```
   Server is running on port 4000
   Using Supabase as database
   ```

4. NO MORE WARNINGS! ✅

---

## Step 8: Test Your Setup (Optional)

Open a new terminal and test:

```bash
# Test health endpoint
curl http://localhost:4000/health

# Test products endpoint
curl http://localhost:4000/api/products
```

---

## 🎉 You're Done!

Your project is now running with Supabase online database!

### What's Working:
- ✅ User Registration & Login (Supabase)
- ✅ Orders Management (Supabase)
- ✅ Products (Local file - works without database)

### Optional: Move Products to Supabase

If you want products in the database too:

1. Make sure server is running
2. Open new terminal:
   ```bash
   cd server
   npm run migrate-products
   ```
3. Update `.env`:
   ```env
   USE_DATABASE=true
   ```
4. Restart server

---

## 🆘 Troubleshooting

**Problem: "Missing Supabase environment variables"**
- Check that you copied the FULL URL and key
- Make sure there are no extra spaces
- Restart your server after updating .env

**Problem: "relation 'users' does not exist"**
- You didn't run the SQL schema
- Go back to Step 5 and run the SQL

**Problem: Can't access Supabase dashboard**
- Check your internet connection
- Try refreshing the page
- Make sure your project finished setting up (green checkmark)

---

## 📞 Need Help?

- Supabase Docs: https://supabase.com/docs
- Check your Supabase project status in dashboard
- Make sure all 4 tables exist in Table Editor
