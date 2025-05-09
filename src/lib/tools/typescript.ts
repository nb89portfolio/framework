import { exec } from 'child_process';

export function typescriptTranspile() {
  try {
    exec('tsc');
  } catch (error) {}
}
