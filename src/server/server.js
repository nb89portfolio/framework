"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var server = http_1.default.createServer(function (req, res) {
    var filePath = path_1.default.join('./src/client/pages/index.html');
    if (req.url === '/') {
        fs_1.default.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error: Unable to load index.html');
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: Not Found');
    }
});
var PORT = 3000;
var HOST = 'localhost';
server.listen(PORT, HOST, function () {
    console.log("Server is running at http://".concat(HOST, ":").concat(PORT, "/"));
});
