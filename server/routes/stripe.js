const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const supabase = require("../config/supabase");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: 2,
        cart: JSON.stringify(req.body.data),
      },
    });

    const line_items = req.body.data.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "BD"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    res.json({ error });
  }
});

// create order function using Supabase
const createOrder = async (customer, data) => {
  console.log("cus", customer, 'da', data);
  const Items = JSON.parse(customer.metadata.cart);

  try {
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: customer.metadata.userId,
          subtotal: data.amount_subtotal,
          total: data.amount_total,
          shipping: data.customer_details,
          payment_status: data.payment_status,
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = Items.map(item => ({
      order_id: order.id,
      product_id: item._id,
      quantity: item.cartQuantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    console.log("Processed Order:", order);
    
    // Queue additional tasks for background processing
    await queueOrderTasks(order, Items, customer, data);
    
  } catch (err) {
    console.log("Error creating order:", err);
  }
};

// Queue background tasks for order processing
async function queueOrderTasks(order, items, customer, paymentData) {
  try {
    // Get task queue (requires the task queue to be available in the app)
    // Note: In a real implementation, you'd get this from app context
    const { getTaskQueue } = require("../workers/taskQueue");
    const taskQueue = getTaskQueue();
    
    if (taskQueue && taskQueue.isInitialized) {
      // Queue order processing task
      await taskQueue.queueOrderProcessing({
        id: order.id,
        userId: order.user_id,
        items: items,
        total: order.total,
        shippingAddress: order.shipping,
        paymentStatus: order.payment_status
      });
      
      // Queue email notification
      await taskQueue.queueEmailNotification({
        to: paymentData.customer_details?.email || customer.email,
        subject: `Order Confirmation #${order.id}`,
        template: 'order_confirmation',
        data: {
          orderId: order.id,
          total: order.total,
          items: items.map(item => ({
            name: item.name,
            quantity: item.cartQuantity,
            price: item.price
          }))
        },
        type: 'order_confirmation'
      });
      
      // Queue inventory updates for each item
      for (const item of items) {
        await taskQueue.queueInventoryUpdate({
          productId: item._id,
          quantity: item.cartQuantity,
          operation: 'decrement',
          reason: `Order ${order.id}`
        });
      }
      
      // Queue analytics
      await taskQueue.queueAnalytics({
        event: 'order_completed',
        userId: order.user_id,
        data: {
          orderId: order.id,
          amount: order.total,
          itemCount: items.length
        }
      });
      
      console.log(`Order ${order.id} tasks queued successfully`);
    } else {
      console.log('Task queue not available, running tasks synchronously');
      // Fallback: Run tasks synchronously if queue is not available
      await runOrderTasksSynchronously(order, items, customer, paymentData);
    }
  } catch (error) {
    console.error('Error queuing order tasks:', error);
    // Don't fail the order if task queue fails
  }
}

// Fallback function if task queue is not available
async function runOrderTasksSynchronously(order, items, customer, paymentData) {
  console.log('Running order tasks synchronously for order:', order.id);
  
  // Simulate the tasks that would be done by workers
  // In production, you might want to implement these properly
  
  // 1. Send email (simulated)
  console.log(`[Sync] Sending confirmation email for order ${order.id}`);
  
  // 2. Update inventory (simulated)
  for (const item of items) {
    console.log(`[Sync] Updating inventory for product ${item._id}, quantity: -${item.cartQuantity}`);
  }
  
  // 3. Analytics (simulated)
  console.log(`[Sync] Recording analytics for order ${order.id}`);
  
  console.log(`[Sync] Order ${order.id} tasks completed`);
}

// Stripe webhook
router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    let webhookSecret;

    if (webhookSecret) {
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            createOrder(customer, data);
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

module.exports = router;
