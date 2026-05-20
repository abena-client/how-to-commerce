// Task Queue Manager - Push tasks to workers
const axjet = require('axjet');

class TaskQueue {
  constructor(port = 5000) {
    this.port = port;
    this.pushSocket = null;
    this.isInitialized = false;
  }

  // Initialize the push socket
  async initialize() {
    if (this.isInitialized) return;
    
    this.pushSocket = axjet.socket('push');
    this.pushSocket.bind(this.port);
    
    // Wait for socket to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.isInitialized = true;
    console.log(`Task queue initialized on port ${this.port}`);
  }

  // Send a task to the worker queue
  async sendTask(taskType, data) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const task = {
      type: taskType,
      data: data,
      timestamp: new Date().toISOString(),
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    try {
      await this.pushSocket.send(JSON.stringify(task));
      console.log(`Task sent: ${taskType} (${task.id})`);
      return { success: true, taskId: task.id };
    } catch (error) {
      console.error('Error sending task:', error);
      return { success: false, error: error.message };
    }
  }

  // Convenience methods for common e-commerce tasks
  async queueOrderProcessing(orderData) {
    return this.sendTask('order_processing', {
      orderId: orderData.id || orderData._id,
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      createdAt: new Date().toISOString()
    });
  }

  async queueEmailNotification(emailData) {
    return this.sendTask('email_notification', {
      to: emailData.to,
      subject: emailData.subject,
      template: emailData.template || 'default',
      data: emailData.data,
      type: emailData.type || 'order_confirmation'
    });
  }

  async queueInventoryUpdate(productData) {
    return this.sendTask('inventory_update', {
      productId: productData.id || productData._id,
      quantity: productData.quantity,
      operation: productData.operation || 'decrement', // 'increment' or 'decrement'
      reason: productData.reason || 'order'
    });
  }

  async queueAnalytics(eventData) {
    return this.sendTask('analytics', {
      event: eventData.event,
      userId: eventData.userId,
      data: eventData.data,
      timestamp: new Date().toISOString()
    });
  }

  async queuePaymentWebhook(webhookData) {
    return this.sendTask('payment_webhook', {
      paymentId: webhookData.paymentId,
      status: webhookData.status,
      amount: webhookData.amount,
      customer: webhookData.customer,
      metadata: webhookData.metadata
    });
  }

  // Close the queue
  async close() {
    if (this.pushSocket) {
      this.pushSocket.close();
      this.isInitialized = false;
      console.log('Task queue closed');
    }
  }
}

// Singleton instance
let taskQueueInstance = null;

function getTaskQueue() {
  if (!taskQueueInstance) {
    taskQueueInstance = new TaskQueue();
  }
  return taskQueueInstance;
}

module.exports = {
  TaskQueue,
  getTaskQueue
};