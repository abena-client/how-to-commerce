require('dotenv').config();
const supabase = require('../config/supabase');

async function testSupabase() {
  console.log('Testing Supabase connection...\n');
  
  console.log('Environment variables:');
  console.log('USE_DATABASE:', process.env.USE_DATABASE);
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Not set');
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set');
  console.log('');

  if (!supabase) {
    console.log('❌ Supabase client is null');
    return;
  }

  try {
    // Test: Get product count
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log('❌ Error:', error.message);
      return;
    }

    console.log(`✅ Successfully connected to Supabase!`);
    console.log(`✅ Found ${count} products in database`);
    
    // Get first 3 products
    const { data: products } = await supabase
      .from('products')
      .select('id, name, category, price')
      .limit(3);

    console.log('\nSample products from Supabase:');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - $${p.price} (${p.category})`);
      console.log(`   ID: ${p.id}`);
    });

  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

testSupabase();
