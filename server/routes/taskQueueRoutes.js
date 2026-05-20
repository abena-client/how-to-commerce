// Example routes demonstrating task queue integration
const express = require("express");
const router = express.Router();

// Test endpoint to queue a task
router.post("/test-task", async (req, res) => {
  try {
    // Get task queue from app locals
    const taskQueue = req.app.locals.taskQueue;
    
    if (!taskQueue || !taskQueue.isInitialized) {
      return res.status(503).json({
        success: false,
        message: "Task queue not available"
      });
    }

    const { taskType, data } = req.body;
    
    if (!taskType) {
      return res.status(400).json({
        success: false,
        message: "taskType is required"
      });
    }

    // Queue the task
    const result = await taskQueue.sendTask(taskType, data || {});
    
    res.status(200).json({
      success: true,
      message: "Task queued successfully",
      taskId: result.taskId
    });
  } catch (error) {
    console.error("Error queuing task:", error);
    res.status(500).json({
      success: false,
      message: "Failed to queue task",
      error: error.message
    });
  }
});

// Example: Queue order processing task
router.post("/queue-order", async (req, res) => {
  try {
    const taskQueue = req.app.locals.taskQueue;
    
    if (!taskQueue || !taskQueue.isInitialized) {
      return res.status(503).json({
        success: false,
        message: "Task queue not available"
      });
    }

    const orderData = req.body;
    
    if (!orderData.id && !orderData._id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required"
      });
    }

    // Queue order processing
    const result = await taskQueue.queueOrderProcessing(orderData);
    
    res.status(200).json({
      success: true,
      message: "Order queued for processing",
      taskId: result.taskId,
      orderId: orderData.id || orderData._id
    });
  } catch (error) {
    console.error("Error queuing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to queue order",
      error: error.message
    });
  }
});

// Example: Queue email notification
router.post("/queue-email", async (req, res) => {
  try {
    const taskQueue = req.app.locals.taskQueue;
    
    if (!taskQueue || !taskQueue.isInitialized) {
      return res.status(503).json({
        success: false,
        message: "Task queue not available"
      });
    }

    const { to, subject, template, data, type } = req.body;
    
    if (!to) {
      return res.status(400).json({
        success: false,
        message: "Email recipient (to) is required"
      });
    }

    // Queue email notification
    const result = await taskQueue.queueEmailNotification({
      to,
      subject: subject || "Notification from HowTo E-commerce",
      template,
      data,
      type: type || "notification"
    });
    
    res.status(200).json({
      success: true,
      message: "Email queued for sending",
      taskId: result.taskId,
      recipient: to
    });
  } catch (error) {
    console.error("Error queuing email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to queue email",
      error: error.message
    });
  }
});

// Get task queue status
router.get("/status", async (req, res) => {
  try {
    const taskQueue = req.app.locals.taskQueue;
    
    res.status(200).json({
      success: true,
      taskQueue: {
        initialized: taskQueue ? taskQueue.isInitialized : false,
        port: taskQueue ? taskQueue.port : null,
        available: !!(taskQueue && taskQueue.isInitialized)
      }
    });
  } catch (error) {
    console.error("Error getting task queue status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get task queue status",
      error: error.message
    });
  }
});

module.exports = router;