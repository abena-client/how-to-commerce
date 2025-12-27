# Authentication Setup

## Backend (Server)

### New Files Created:
- `model/userModel.js` - User schema with name, email, password
- `controllers/authController.js` - Register, login, and protect middleware
- `routes/authRoutes.js` - Auth routes for /register and /login

### Updated Files:
- `index.js` - Added auth routes
- `.env` - Added JWT_SECRET and JWT_EXPIRES_IN

### API Endpoints:
- `POST /api/auth/register` - Register new user
  - Body: { name, email, password }
- `POST /api/auth/login` - Login user
  - Body: { email, password }

## Frontend (Client)

### New Files Created:
- `pages/Login.js` - Login page component
- `pages/Register.js` - Registration page component
- `features/auth/authSlice.js` - Redux slice for authentication

### Updated Files:
- `App.js` - Added /login and /register routes
- `app/store.js` - Added auth reducer
- `components/Navbar.js` - Added login/register links and logout button

### Features:
- User registration with validation
- User login
- JWT token stored in localStorage
- Protected routes (middleware available)
- User info displayed in navbar
- Logout functionality

## How to Test:

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd client
   npm start
   ```

3. Navigate to http://localhost:3000/register to create an account
4. Login at http://localhost:3000/login
5. User info will appear in the navbar when logged in

## Notes:
- Passwords are hashed using bcrypt
- JWT tokens expire in 7 days (configurable in .env)
- User data persists in localStorage
- Change JWT_SECRET in production!
