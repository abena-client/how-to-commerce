const supabase = require('../config/supabase');
const products = require('../data/expandedProducts');

async function migrateProducts() {
  console.log('Starting product migration to Supabase...');
  console.log(`Found ${products.length} products to migrate`);

  try {
    // Transform products for Supabase (remove _id, let Supabase generate UUID)
    const productsForSupabase = products.map(product => ({
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price
    }));

    // Insert products in batches
    const { data, error } = await supabase
      .from('products')
      .insert(productsForSupabase)
      .select();

    if (error) {
      console.error('Error migrating products:', error);
      return;
    }

    console.log(`✅ Successfully migrated ${data.length} products to Supabase!`);
    console.log('Sample product:', data[0]);
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

// Run migration
migrateProducts();
