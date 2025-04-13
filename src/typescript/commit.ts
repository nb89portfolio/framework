import { exec } from 'child_process';
import { createInterface } from 'readline';

async function commit() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter commit message: ', (answer) => {
    rl.close();

    exec(
      `git add . && git commit -m "${answer}" && git push origin dev`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      }
    );
  });
}

commit();
