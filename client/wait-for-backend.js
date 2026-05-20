#!/usr/bin/env node

/**
 * Script to wait for backend server to be available before starting frontend.
 * Run this from the client directory: node wait-for-backend.js
 */

const http = require('http');
const { spawn } = require('child_process');

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const MAX_RETRIES = 30; // 30 * 2 seconds = 60 seconds total
const RETRY_DELAY = 2000; // 2 seconds

function checkBackendHealth() {
  return new Promise((resolve) => {
    const req = http.get(`${API_URL}/health`, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json.status === 'ok');
          } catch {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });

    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => { req.destroy(); resolve(false); });
  });
}

async function waitForBackend() {
  console.log(`⏳ Waiting for backend server at ${API_URL}...`);

  for (let i = 1; i <= MAX_RETRIES; i++) {
    process.stdout.write(`   Attempt ${i}/${MAX_RETRIES}... `);
    const healthy = await checkBackendHealth();

    if (healthy) {
      console.log('✅');
      console.log('✅ Backend server is ready!\n');
      return true;
    }

    console.log('not ready yet.');
    if (i < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY));
    }
  }

  console.error('\n❌ Backend did not become available within 60 seconds.');
  console.error('   Make sure the server is running: cd server && npm start\n');
  return false;
}

function startReactApp() {
  console.log('🚀 Starting React development server...\n');

  const child = spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    shell: true, // required on Windows
  });

  child.on('error', (err) => {
    console.error('Failed to start React app:', err.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

async function main() {
  if (process.env.REACT_APP_ENABLE_BACKEND_CHECK === 'false') {
    console.log('⚠️  Backend check disabled. Starting frontend immediately...\n');
    startReactApp();
    return;
  }

  const backendReady = await waitForBackend();

  if (!backendReady) {
    console.log('⚠️  Starting frontend anyway — the app will show a warning banner when backend is unavailable.\n');
  }

  startReactApp();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
