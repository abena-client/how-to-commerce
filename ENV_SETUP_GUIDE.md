# Environment Variables Setup Guide

You need to configure these remaining variables in `server/.env`:

---

## 1. STRIPE_KEY (For Payment Processing)

### What is it?
Your Stripe secret key for processing payments.

### How to get it:

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com
2. **Sign up or log in** (free account)
3. **Get your test key**:
   - Click **Developers** in the top menu
   - Click **API keys**
   - Copy the **Secret key** (starts with `sk_test_...`)
   - ⚠️ Use **Test mode** for development (toggle in top right)

4. **Update .env**:
   ```env
   STRIPE_KEY=sk_test_51Abc...your_actual_key
   ```

### Important:
- Use **test keys** for development (sk_test_...)
- Use **live keys** only for production (sk_live_...)
- Never commit your secret key to Git!

---

## 2. CLIENT_URL (Frontend URL)

### What is it?
The URL where your frontend/client application runs.

### Default value:
```env
CLIENT_URL=http://localhost:3000
```

### When to change:
- If your frontend runs on a different port (e.g., 5173 for Vite)
- In production, use your actual domain (e.g., https://mystore.com)

### Examples:
```env
# React default
CLIENT_URL=http://localhost:3000

# Vite default
CLIENT_URL=http://localhost:5173

# Next.js default
CLIENT_URL=http://localhost:3000

# Production
CLIENT_URL=https://yourdomain.com
```

---

## 3. JWT_SECRET (Authentication Security)

### What is it?
A secret key used to sign and verify JWT tokens for user authentication.

### How to set it:

**Option 1: Generate a strong random secret**

Run this in your terminal:
```bash
# Windows PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Use a passphrase**
```env
JWT_SECRET=MySuper$ecretKey2024!ForAuth
```

**Option 3: Use an online generator**
- Go to: https://randomkeygen.com/
- Copy a "Fort Knox Password"

### Update .env:
```env
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c
```

### Important:
- Must be at least 32 characters
- Keep it secret and secure
- Never share or commit to Git
- Change it in production

---

## 4. JWT_EXPIRES_IN (Token Expiration)

### What is it?
How long a user's login session lasts.

### Default value:
```env
JWT_EXPIRES_IN=7d
```

### Options:
```env
JWT_EXPIRES_IN=1h    # 1 hour
JWT_EXPIRES_IN=24h   # 24 hours
JWT_EXPIRES_IN=7d    # 7 days (recommended)
JWT_EXPIRES_IN=30d   # 30 days
JWT_EXPIRES_IN=90d   # 90 days
```

### Recommendation:
- **Development**: 7d or 30d (convenient)
- **Production**: 7d (good balance of security and UX)
- **High security apps**: 1h or 24h

---

## Quick Setup (Minimum to Get Started)

If you just want to test without Stripe payments:

```env
# Stripe - Leave as is for now (payments won't work but app will run)
STRIPE_KEY=your_stripe_key_here

# Client URL - Update if your frontend uses different port
CLIENT_URL=http://localhost:3000

# JWT Secret - Generate a random string
JWT_SECRET=MyTestSecret123456789012345678901234567890

# JWT Expiration - Keep default
JWT_EXPIRES_IN=7d
```

---

## Complete .env Example

```env
PORT=4000

# Supabase Configuration
SUPABASE_URL=https://sssuhsidixsjonnoxciy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Set to 'true' to use Supabase database for products
USE_DATABASE=true

# Stripe Configuration
STRIPE_KEY=sk_test_51Abc123...your_stripe_test_key

# Client URL (where your frontend runs)
CLIENT_URL=http://localhost:3000

# JWT Configuration (for user authentication)
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c
JWT_EXPIRES_IN=7d
```

---

## Testing Without Stripe

If you don't have a Stripe account yet, you can still test:

1. **Authentication** - Will work fine
2. **Products** - Will work fine
3. **Orders** - Will work fine
4. **Checkout** - Will fail (needs Stripe key)

To test checkout later, just add your Stripe key and restart the server.

---

## Security Checklist

- [ ] JWT_SECRET is at least 32 characters
- [ ] Using Stripe test keys (sk_test_...) for development
- [ ] .env file is in .gitignore
- [ ] Never committed secrets to Git
- [ ] Different secrets for production

---

## Need Help?

### Get Stripe Test Key:
1. https://dashboard.stripe.com
2. Developers → API keys
3. Copy "Secret key" (test mode)

### Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check if frontend is running:
Open http://localhost:3000 in browser
