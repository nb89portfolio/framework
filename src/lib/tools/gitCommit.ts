import { exec } from 'child_process';
import readline from 'readline';

function gitCommit(): void {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Commit message: ', (message) => {
      rl.close();
      exec(
        `git add . && git commit -m "${message}" && git push origin dev`,
        (error, stdout, stderr) => {
          if (error) console.error(error);
          if (stderr) console.error(stderr);
          console.log(stdout);
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
}

gitCommit();
