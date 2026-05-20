// Worker that processes tasks from the queue
const axjet = require('axjet');

// Pull socket - workers pull tasks from the queue
async function startWorker(workerId) {
  const pull = axjet.socket('pull');
  
  // Connect to push socket
  pull.connect(5000);
  
  console.log(`Worker ${workerId} started and connected to queue`);
  
  // Continuously pull and process tasks
  while (true) {
    try {
      const task = await pull.recv();
      if (task) {
        console.log(`Worker ${workerId} received task: ${task}`);
        await processTask(task, workerId);
      }
    } catch (error) {
      console.error(`Worker ${workerId} error:`, error);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
    }
  }
}

// Process different types of tasks
async function processTask(task, workerId) {
  const taskData = JSON.parse(task);
  
  console.log(`Worker ${workerId} processing task type: ${taskData.type}`);
  
  switch (taskData.type) {
    case 'order_processing':
      await processOrder(taskData.data);
      break;
    case 'email_notification':
      await sendEmailNotification(taskData.data);
      break;
    case 'inventory_update':
      await updateInventory(taskData.data);
      break;
    case 'analytics':
      await processAnalytics(taskData.data);
      break;
    case 'payment_webhook':
      await handlePaymentWebhook(taskData.data);
      break;
    default:
      console.log(`Worker ${workerId}: Unknown task type: ${taskData.type}`);
  }
  
  console.log(`Worker ${workerId} completed task: ${taskData.type}`);
}

// Task processing functions
async function processOrder(orderData) {
  console.log('Processing order:', orderData.orderId);
  // Simulate order processing
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Order ${orderData.orderId} processed successfully`);
}

async function sendEmailNotification(emailData) {
  console.log('Sending email to:', emailData.to);
  // Simulate email sending
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log(`Email sent to ${emailData.to}`);
}

async function updateInventory(inventoryData) {
  console.log('Updating inventory for product:', inventoryData.productId);
  // Simulate inventory update
  await new Promise(resolve => setTimeout(resolve, 200));
  console.log(`Inventory updated for product ${inventoryData.productId}`);
}

async function processAnalytics(analyticsData) {
  console.log('Processing analytics:', analyticsData.event);
  // Simulate analytics processing
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log(`Analytics processed for ${analyticsData.event}`);
}

async function handlePaymentWebhook(webhookData) {
  console.log('Handling payment webhook:', webhookData.paymentId);
  // Simulate webhook processing
  await new Promise(resolve => setTimeout(resolve, 400));
  console.log(`Payment webhook processed for ${webhookData.paymentId}`);
}

// Start worker if this file is run directly
if (require.main === module) {
  const workerId = process.argv[2] || '1';
  startWorker(workerId).catch(console.error);
}

module.exports = { startWorker };