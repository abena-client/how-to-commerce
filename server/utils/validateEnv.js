const chalk = require('chalk');

function validateEnv() {
  const errors = [];
  const warnings = [];
  const info = [];

  // Check required variables
  if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'your_supabase_project_url') {
    errors.push('SUPABASE_URL is not configured');
  }

  if (!process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY === 'your_supabase_anon_key') {
    errors.push('SUPABASE_ANON_KEY is not configured');
  }

  // Check optional but recommended variables
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key-change-this') {
    warnings.push('JWT_SECRET is using default value (not secure for production)');
  }

  if (!process.env.STRIPE_KEY || process.env.STRIPE_KEY === 'your_stripe_key_here') {
    info.push('STRIPE_KEY not configured - Checkout will not work');
  }

  // Display results
  console.log('\n' + '='.repeat(60));
  console.log('  ENVIRONMENT VALIDATION');
  console.log('='.repeat(60) + '\n');

  if (errors.length > 0) {
    console.log('❌ ERRORS (Server may not work properly):');
    errors.forEach(err => console.log(`   - ${err}`));
    console.log('\n📖 See ENV_SETUP_GUIDE.md for setup instructions\n');
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(warn => console.log(`   - ${warn}`));
    console.log('');
  }

  if (info.length > 0) {
    console.log('ℹ️  INFO:');
    info.forEach(i => console.log(`   - ${i}`));
    console.log('');
  }

  if (errors.length === 0 && warnings.length === 0 && info.length === 0) {
    console.log('✅ All environment variables configured correctly!\n');
  }

  console.log('='.repeat(60) + '\n');

  return {
    hasErrors: errors.length > 0,
    hasWarnings: warnings.length > 0,
    errors,
    warnings,
    info
  };
}

module.exports = validateEnv;
