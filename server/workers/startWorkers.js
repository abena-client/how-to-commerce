#!/usr/bin/env node
// Script to start multiple worker instances
const { startWorker } = require('./taskWorker');

// Number of workers to start (can be configured via environment variable)
const WORKER_COUNT = process.env.WORKER_COUNT || 3;

console.log(`Starting ${WORKER_COUNT} worker(s)...`);

// Start workers
for (let i = 1; i <= WORKER_COUNT; i++) {
  startWorker(i.toString()).catch(error => {
    console.error(`Worker ${i} failed:`, error);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down workers...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down workers...');
  process.exit(0);
});

console.log('Workers started. Press Ctrl+C to stop.');