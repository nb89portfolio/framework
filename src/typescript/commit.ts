import { exec } from 'child_process';
import { createInterface } from 'readline';

async function commit() {
  try {
    const readLine = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let test = '';

    readLine.question('Enter commit message: ', (answer) => {
      readLine.close();

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

    console.log(test);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Attempt to commit to dev branch is complete.');
  }
}

commit();
