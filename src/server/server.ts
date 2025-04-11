import http from 'http';
import path from 'path';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const filePath = path.join('./src/client/pages/index.html');

  if (req.url === '/') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: Unable to load index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404: Not Found');
  }
});

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}/`);
});
