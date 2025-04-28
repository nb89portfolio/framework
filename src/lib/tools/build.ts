import { exec } from 'child_process';

function build(): void {
  try {
    exec('tsc', (error, stdout, stderr) => {
      if (error) console.error(error);
      if (stderr) console.error(stderr);
      console.log(stdout);
    });
  } catch (error) {
    console.error(error);
  }
}

build();
