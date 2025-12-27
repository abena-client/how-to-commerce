# 🎯 START HERE - Setup Supabase in 10 Minutes

Your project is **ready to connect to Supabase**! Just follow these simple steps.

---

## 🚀 What You Need to Do

### 1️⃣ Create Supabase Account (2 min)
- Go to **https://supabase.com**
- Sign up (use GitHub - it's fastest!)

### 2️⃣ Create Project (2 min)
- Click "New Project"
- Name it: `howto-commerce`
- Create a password (write it down!)
- Choose your region
- Wait for it to finish

### 3️⃣ Get Your Keys (1 min)
- Click **Settings** → **API**
- Copy two things:
  1. **Project URL** (looks like: `https://xxx.supabase.co`)
  2. **anon public key** (long string starting with `eyJ...`)

### 4️⃣ Update .env File (1 min)
- Open `server/.env`
- Replace these two lines with YOUR values:
  ```
  SUPABASE_URL=your_supabase_project_url
  SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
- Save the file

### 5️⃣ Create Database Tables (2 min)
- In Supabase: **SQL Editor** → **New query**
- Copy everything from `server/supabase_schema.sql`
- Paste and click **Run**

### 6️⃣ Start Your Server (1 min)
```bash
npm start
```

---

## ✅ That's It!

Your server will now use Supabase online database!

---

## 📚 Need More Details?

- **Detailed Guide**: Open `SETUP_SUPABASE_NOW.md`
- **Step-by-Step Checklist**: Open `CHECKLIST.md`
- **Quick Reference**: Open `QUICK_REFERENCE.txt`

---

## 🎉 After Setup

Your project will have:
- ✅ User authentication (register/login)
- ✅ Order management
- ✅ Products (from local file)
- ✅ All data stored in Supabase cloud

---

## 💡 Pro Tip

Keep your Supabase dashboard open in a browser tab. You can:
- View your data in **Table Editor**
- Run queries in **SQL Editor**
- Monitor usage in **Dashboard**

---

**Ready? Start with Step 1 above! 🚀**
