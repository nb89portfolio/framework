import { exec } from 'child_process';
import { createInterface } from 'readline';

/**
 * Prompts the user to enter a "Commit message" and returns the input.
 * @returns Promise<string>
 */
const promptCommitMessage = async (): Promise<string> => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter commit message: ', (message) => {
      rl.close();
      resolve(message);
    });
  });
};

// Example Usage
(async () => {
  const commitMessage = await promptCommitMessage();

  exec(
    `git add . && git commit -m "${commitMessage} && git push origin dev"`,
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
})();
