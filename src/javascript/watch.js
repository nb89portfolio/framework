"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var manageServerWithWatch = function (directoryToWatch, serverFile, nodeCommand) {
    var serverProcess = null;
    var watcher;
    var startServer = function () {
        if (serverProcess) {
            console.log('Server process is already running.');
            return;
        }
        serverProcess = (0, child_process_1.spawn)('node', [serverFile], { stdio: 'inherit' });
        console.log('Server process started.');
    };
    var stopServer = function () {
        if (serverProcess) {
            serverProcess.kill();
            serverProcess = null;
            console.log('Server process stopped.');
        }
    };
    var executeCommand = function () {
        console.log("Executing command: ".concat(nodeCommand));
        var commandProcess = (0, child_process_1.spawn)(nodeCommand, { shell: true });
        commandProcess.stdout.on('data', function (data) {
            return console.log("Output: ".concat(data.toString()));
        });
        commandProcess.stderr.on('data', function (data) {
            return console.error("Error: ".concat(data.toString()));
        });
        commandProcess.on('close', function () {
            console.log('Command execution completed.');
            startServer();
            startWatching();
        });
    };
    var startWatching = function () {
        console.log("Watching for changes in: ".concat(directoryToWatch));
        watcher = (0, fs_1.watch)(directoryToWatch, { recursive: true }, function (eventType, filename) {
            if (eventType === 'change' && filename) {
                console.log("File changed: ".concat(filename));
                watcher.close();
                console.log('Stopped watching directory.');
                stopServer();
                executeCommand();
            }
        });
    };
    startServer();
    startWatching();
};
var directory = './src';
var server = path_1.default.join('./src/javascript/server.js');
var command = 'npm run build';
manageServerWithWatch(directory, server, command);
