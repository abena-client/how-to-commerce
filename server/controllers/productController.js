const supabase = require('../config/supabase');
const productsFromFile = require('../data/expandedProducts');

// Set to true to use Supabase database, false to use local file
const USE_DATABASE = process.env.USE_DATABASE === 'true';

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    if (USE_DATABASE) {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(products);
    }
    
    // Use local file data
    res.status(200).json(productsFromFile);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (USE_DATABASE) {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(products);
    }

    // Use local file data
    const filteredProducts = productsFromFile.filter(
      product => product.category === category
    );
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (USE_DATABASE) {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return res.status(404).json({
          status: 'fail',
          message: 'Product not found'
        });
      }
      return res.status(200).json(product);
    }

    // Use local file data
    const product = productsFromFile.find(p => p._id === id);
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    if (USE_DATABASE) {
      const { data: products, error } = await supabase
        .from('products')
        .select('category');

      if (error) throw error;
      
      const categories = [...new Set(products.map(p => p.category))];
      return res.status(200).json(categories);
    }

    // Use local file data
    const categories = [...new Set(productsFromFile.map(p => p.category))];
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};
