const { SignJWT, jwtVerify } = require('jose');
const supabase = require('../config/supabase');

let bcrypt;
try {
  bcrypt = require('bcrypt');
} catch (err) {
  bcrypt = require('bcryptjs');
}

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-this';
  return new TextEncoder().encode(secret);
};

const signToken = async (id) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(getSecretKey());
};

exports.register = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        status: 'fail',
        message: 'Database not configured. Please add Supabase credentials to .env file.'
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Generate token
    const token = await signToken(user.id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        status: 'fail',
        message: 'Database not configured. Please add Supabase credentials to .env file.'
      });
    }

    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // Generate token
    const token = await signToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        status: 'fail',
        message: 'Database not configured'
      });
    }

    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in'
      });
    }

    const { payload } = await jwtVerify(token, getSecretKey());
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, created_at')
      .eq('id', payload.id)
      .single();

    if (error || !user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User no longer exists'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token'
    });
  }
};
