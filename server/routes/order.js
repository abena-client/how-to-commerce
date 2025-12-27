const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        status: 'fail',
        message: 'Database not configured. Please add Supabase credentials to .env file.'
      });
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          product_id,
          products (*)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
});

module.exports = router;
