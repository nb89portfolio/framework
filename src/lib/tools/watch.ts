import * as fs from 'fs';
import { spawn, ChildProcess } from 'child_process';

const directoryToWatch = './src';
let serverProcess: ChildProcess | null = null;

const startServer = () => {
  if (serverProcess) {
    serverProcess.kill();
    console.log('Restarting server...');
  }

  serverProcess = spawn(
    'node',
    ['src/lib/build/typescript/lib/tools/server.js'],
    {
      stdio: 'inherit',
    }
  );
};

fs.watch(directoryToWatch, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`File changed: ${filename}`);
    startServer();
  }
});

startServer();
