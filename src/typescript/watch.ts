import { watch } from 'fs';
import { ChildProcess, spawn } from 'child_process';
import path from 'path';

const manageServerWithWatch = (
  directoryToWatch: string,
  serverFile: string,
  nodeCommand: string
) => {
  let serverProcess: ChildProcess | null = null;
  let watcher: any;

  const startServer = () => {
    if (serverProcess) {
      console.log('Server process is already running.');
      return;
    }
    serverProcess = spawn('node', [serverFile], { stdio: 'inherit' });
    console.log('Server process started.');
  };

  const stopServer = () => {
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = null;
      console.log('Server process stopped.');
    }
  };

  const executeCommand = () => {
    console.log(`Executing command: ${nodeCommand}`);
    const commandProcess = spawn(nodeCommand, { shell: true });

    commandProcess.stdout.on('data', (data) =>
      console.log(`Output: ${data.toString()}`)
    );
    commandProcess.stderr.on('data', (data) =>
      console.error(`Error: ${data.toString()}`)
    );

    commandProcess.on('close', () => {
      console.log('Command execution completed.');

      startServer();
      startWatching();
    });
  };

  const startWatching = () => {
    console.log(`Watching for changes in: ${directoryToWatch}`);
    watcher = watch(
      directoryToWatch,
      { recursive: true },
      (eventType, filename) => {
        if (eventType === 'change' && filename) {
          console.log(`File changed: ${filename}`);
          watcher.close();
          console.log('Stopped watching directory.');
          stopServer();
          executeCommand();
        }
      }
    );
  };

  startServer();
  startWatching();
};

const directory = './src';
const server = path.join('./src/javascript/server.js');
const command = 'npm run build';

manageServerWithWatch(directory, server, command);
