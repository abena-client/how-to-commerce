#!/usr/bin/env node
// Test script to demonstrate the worker queue system
const { getTaskQueue } = require('./taskQueue');

async function testTaskQueue() {
  console.log('Testing Task Queue System...\n');
  
  try {
    // Get task queue instance
    const taskQueue = getTaskQueue();
    
    // Initialize the queue
    await taskQueue.initialize();
    console.log('✅ Task queue initialized\n');
    
    // Test 1: Queue order processing
    console.log('Test 1: Queue order processing task');
    const orderResult = await taskQueue.queueOrderProcessing({
      id: 'test_order_123',
      userId: 'test_user_456',
      items: [
        { _id: 'prod_1', name: 'Test Product 1', price: 29.99, cartQuantity: 2 },
        { _id: 'prod_2', name: 'Test Product 2', price: 49.99, cartQuantity: 1 }
      ],
      total: 109.97,
      shippingAddress: {
        name: 'Test Customer',
        address: '123 Test St',
        city: 'Test City',
        country: 'Test Country'
      }
    });
    console.log(`   Order queued: ${orderResult.taskId}\n`);
    
    // Test 2: Queue email notification
    console.log('Test 2: Queue email notification task');
    const emailResult = await taskQueue.queueEmailNotification({
      to: 'test@example.com',
      subject: 'Test Order Confirmation',
      template: 'order_confirmation',
      data: {
        orderId: 'test_order_123',
        customerName: 'Test Customer',
        total: 109.97
      }
    });
    console.log(`   Email queued: ${emailResult.taskId}\n`);
    
    // Test 3: Queue inventory update
    console.log('Test 3: Queue inventory update task');
    const inventoryResult = await taskQueue.queueInventoryUpdate({
      productId: 'prod_1',
      quantity: 2,
      operation: 'decrement',
      reason: 'test order'
    });
    console.log(`   Inventory update queued: ${inventoryResult.taskId}\n`);
    
    // Test 4: Queue analytics
    console.log('Test 4: Queue analytics task');
    const analyticsResult = await taskQueue.queueAnalytics({
      event: 'test_purchase',
      userId: 'test_user_456',
      data: {
        amount: 109.97,
        products: 2
      }
    });
    console.log(`   Analytics queued: ${analyticsResult.taskId}\n`);
    
    // Test 5: Custom task
    console.log('Test 5: Queue custom task');
    const customResult = await taskQueue.sendTask('custom_test', {
      message: 'This is a custom test task',
      timestamp: new Date().toISOString()
    });
    console.log(`   Custom task queued: ${customResult.taskId}\n`);
    
    console.log('✅ All test tasks queued successfully!');
    console.log('\nNow start workers to process these tasks:');
    console.log('   npm run start-workers');
    console.log('\nOr start a single worker:');
    console.log('   npm run worker -- 1');
    
    // Close the queue
    setTimeout(async () => {
      await taskQueue.close();
      console.log('\n✅ Test completed, task queue closed');
      process.exit(0);
    }, 1000);
    
  } catch (error) {
    console.error('❌ Error testing task queue:', error);
    process.exit(1);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testTaskQueue();
}

module.exports = { testTaskQueue };