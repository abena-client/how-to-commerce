# ✅ Supabase Setup Checklist

Print this or keep it open while you set up Supabase.

---

## Before You Start
- [ ] I have internet connection
- [ ] I have a browser open
- [ ] My code editor is open

---

## Part 1: Supabase Account & Project

- [ ] Go to https://supabase.com
- [ ] Create account (GitHub or email)
- [ ] Click "New Project"
- [ ] Enter project name: `howto-commerce`
- [ ] Create & save database password: `________________`
- [ ] Select region: `________________`
- [ ] Click "Create new project"
- [ ] Wait for project to finish (green checkmark appears)

---

## Part 2: Get Credentials

- [ ] Click Settings (⚙️) → API
- [ ] Copy Project URL
  ```
  Paste here: ________________________________
  ```
- [ ] Copy anon/public key (starts with eyJ...)
  ```
  Paste here: ________________________________
  ```

---

## Part 3: Update Code

- [ ] Open `server/.env` file
- [ ] Replace `SUPABASE_URL=your_supabase_project_url` with real URL
- [ ] Replace `SUPABASE_ANON_KEY=your_supabase_anon_key` with real key
- [ ] Save file (Ctrl+S)

---

## Part 4: Create Database Tables

- [ ] In Supabase, click "SQL Editor"
- [ ] Click "New query"
- [ ] Open `server/supabase_schema.sql` in code editor
- [ ] Copy ALL content (Ctrl+A, Ctrl+C)
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" (or Ctrl+Enter)
- [ ] See "Success. No rows returned" ✅

---

## Part 5: Verify

- [ ] In Supabase, click "Table Editor"
- [ ] See `users` table
- [ ] See `products` table
- [ ] See `orders` table
- [ ] See `order_items` table

---

## Part 6: Start Server

- [ ] Stop current server (Ctrl+C if running)
- [ ] Run `npm start` in terminal
- [ ] See "Server is running on port 4000"
- [ ] NO warnings about Supabase

---

## 🎉 Done!

If all boxes are checked, your project is running with Supabase online!

Test it:
```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/products
```
