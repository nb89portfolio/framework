import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const port = 3000;
const htmlDir = path.join('./src/html/pages/index.html');

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const indexPath = path.join(htmlDir);
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Error: File not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Error: Not found');
    }
  })
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
