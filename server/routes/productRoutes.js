const express = require('express');
const {
  getAllProducts,
  getProductsByCategory,
  getProduct,
  getCategories
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

module.exports = router;
