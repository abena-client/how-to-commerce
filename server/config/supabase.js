require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if Supabase is configured
const isConfigured = supabaseUrl && 
                     supabaseKey && 
                     supabaseUrl !== 'your_supabase_project_url' && 
                     supabaseKey !== 'your_supabase_anon_key' &&
                     supabaseUrl.includes('supabase.co');

if (!isConfigured) {
  console.log('⚠️  Supabase not configured properly');
  console.log('📖 See ENV_SETUP_GUIDE.md or START_HERE.md for setup instructions');
  console.log('');
  module.exports = null;
} else {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected successfully');
    module.exports = supabase;
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error.message);
    module.exports = null;
  }
}
