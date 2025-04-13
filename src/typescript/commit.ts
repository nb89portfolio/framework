import { exec } from 'child_process';
import { createInterface } from 'readline';

async function getCommitMessage(): Promise<string> {
  const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readLine.question('Enter commit message: ', (message) => {
      readLine.close();
      resolve(message);
    });
  });
}

async function commit() {
  const message = await getCommitMessage();

  exec(
    `git add . && git commit -m "${message}" && git push origin dev"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}

commit();
