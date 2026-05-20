# Worker Queue System

This system uses **Axjet** (a ZeroMQ-style messaging library) to offload heavy or slow tasks from the main Express server into background workers. Instead of making the API wait while processing an order or sending an email, the server just drops the task into a queue and responds immediately — workers pick it up and handle it in the background.

---

## How It Works (Push/Pull Pattern)

The core idea is simple: one side **pushes** tasks, the other side **pulls** and processes them.

```
HTTP Request
     │
     ▼
┌─────────────┐   push task   ┌─────────────┐
│   Express   │ ────────────▶ │  Task Queue │
│   Server    │               │  (port 5000)│
└─────────────┘               └──────┬──────┘
                                     │ round-robin distribution
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
             ┌──────────┐    ┌──────────┐    ┌──────────┐
             │ Worker 1 │    │ Worker 2 │    │ Worker 3 │
             │  (pull)  │    │  (pull)  │    │  (pull)  │
             └──────────┘    └──────────┘    └──────────┘
```

- The **push socket** (in `taskQueue.js`) binds to port 5000 and distributes tasks round-robin across all connected workers.
- Each **pull socket** (in `taskWorker.js`) connects to port 5000 and waits for tasks. When a task arrives, it processes it and then waits for the next one.
- If you have 3 workers, task 1 goes to Worker 1, task 2 to Worker 2, task 3 to Worker 3, task 4 back to Worker 1, and so on — automatically load balanced.

---

## Files

| File | Role |
|---|---|
| `taskQueue.js` | The **push side**. Wraps the Axjet push socket. The main server uses this to send tasks. |
| `taskWorker.js` | The **pull side**. Connects to the queue, receives tasks, and processes them. |
| `startWorkers.js` | Convenience script to launch multiple worker instances at once. |
| `testQueue.js` | Test script that pushes sample tasks so you can verify the system works. |

---

## Task Queue (`taskQueue.js`)

This is a singleton class that the Express server uses to send tasks. It binds a push socket to port 5000 on startup.

```js
const { getTaskQueue } = require('./workers/taskQueue');
const taskQueue = getTaskQueue();

// Send any custom task
await taskQueue.sendTask('task_type', { ...data });

// Or use the built-in convenience methods:
await taskQueue.queueOrderProcessing({ orderId, userId, items, total });
await taskQueue.queueEmailNotification({ to, subject, template, data });
await taskQueue.queueInventoryUpdate({ productId, quantity, operation });
await taskQueue.queueAnalytics({ event, userId, data });
await taskQueue.queuePaymentWebhook({ paymentId, status, amount });
```

Each task gets a unique ID and a timestamp automatically:

```json
{
  "id": "task_1716200000000_x7k2m",
  "type": "order_processing",
  "timestamp": "2026-05-20T10:00:00.000Z",
  "data": { ... }
}
```

---

## Worker (`taskWorker.js`)

Each worker runs an infinite loop: connect → wait for task → process → repeat.

```js
// Simplified version of what happens inside
const pull = axjet.socket('pull');
pull.connect(5000); // connect to the push socket

while (true) {
  const task = await pull.recv();   // blocks until a task arrives
  await processTask(task);          // handle it
}
```

The `processTask` function routes each task to the right handler based on `task.type`:

| Task Type | Handler | What it does |
|---|---|---|
| `order_processing` | `processOrder()` | Handles post-payment order logic |
| `email_notification` | `sendEmailNotification()` | Sends transactional emails |
| `inventory_update` | `updateInventory()` | Adjusts product stock levels |
| `analytics` | `processAnalytics()` | Records events and metrics |
| `payment_webhook` | `handlePaymentWebhook()` | Processes Stripe/payment events |

To add a new task type, add a `case` to the switch in `processTask` and write the handler function.

---

## Running Workers

Workers run as a **separate process** from the main server. Start them in a new terminal:

```bash
# Start 3 workers (default)
cd server
npm run start-workers

# Start a custom number of workers
WORKER_COUNT=5 npm run start-workers

# Start a single worker manually
npm run worker -- 1
```

> Workers must be running for tasks to be processed. If no workers are connected, tasks queue up in memory and will be delivered once a worker connects.

---

## Integration with the Server

The task queue is initialized automatically when the server starts (`server/index.js`):

```js
const { getTaskQueue } = require('./workers/taskQueue');

const taskQueue = getTaskQueue();
await taskQueue.initialize(); // binds push socket to port 5000
app.locals.taskQueue = taskQueue; // available in all route handlers
```

It's also wired into the Stripe webhook — when a payment succeeds, an `order_processing` task is automatically queued instead of blocking the webhook response.

---

## API Endpoints

You can interact with the queue via REST for testing:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks/status` | Check if the queue is initialized |
| `POST` | `/api/tasks/test-task` | Push any task manually (for testing) |
| `POST` | `/api/tasks/queue-order` | Queue an order processing task |
| `POST` | `/api/tasks/queue-email` | Queue an email notification task |

---

## Testing the System

1. Start the server: `npm start` (from root)
2. Start workers in a separate terminal: `cd server && npm run start-workers`
3. Push test tasks: `cd server && node workers/testQueue.js`
4. Watch the worker terminal — you'll see each task being received and processed.

---

## Why Use This?

Without a worker queue, every slow operation (sending email, updating inventory, generating reports) blocks the API response. With the queue:

- **API stays fast** — just push the task and return 200 immediately
- **Workers scale independently** — add more workers under heavy load
- **Failures are isolated** — a crashed worker doesn't take down the server
- **Tasks are distributed automatically** — round-robin across all connected workers, no extra config needed
