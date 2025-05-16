import * as fs from 'fs';
import { spawn, ChildProcess } from 'child_process';

type State = ChildProcess | null;

type FunctionState = {
  getState: () => State;
  setState: (newState: State) => void;
};

function createState(initialState: State) {
  const state = [initialState];

  return {
    getState: () => {
      return state[0];
    },
    setState: (newState: State) => {
      state.pop();
      state.push(newState);
    },
  };
}

function startServer(state: FunctionState) {
  const currentState = state.getState();

  if (currentState) {
    currentState.kill();
    console.log('Restarting server...');
  }

  const dir = process.env.SERVER_DIRECTORY;

  if (dir) {
    const newState = spawn('node', [dir], {
      stdio: 'inherit',
    });

    state.setState(newState);
  }
}

function watch(state: FunctionState) {
  const dir = process.env.SOURCE_DIRECTORY;

  if (dir) {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename) {
        console.log(`File changed: ${filename}`);
        startServer(state);
      }
    });
  }
}

const state = createState(null);

startServer(state);

watch(state);
