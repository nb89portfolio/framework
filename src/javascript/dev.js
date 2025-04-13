"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var child_process_1 = require("child_process");
// Directory to watch
var directoryToWatch = './watched-directory'; // Change this to your directory path
// Path to the server file
var serverFile = './server.js'; // Replace with the path to your server file
// Variable to store the server process
var serverProcess;
// Function to start the server
var startServer = function () {
    // Kill the previous server process if it exists
    if (serverProcess) {
        serverProcess.kill();
        console.log('Server process stopped.');
    }
    // Spawn a new server process
    serverProcess = (0, child_process_1.spawn)('node', [serverFile], { stdio: 'inherit' });
    console.log('Server process started.');
};
// Start the initial server
startServer();
// Watch the directory for changes
console.log("Watching for changes in: ".concat(directoryToWatch));
(0, fs_1.watch)(directoryToWatch, { recursive: true }, function (eventType, filename) {
    if (filename) {
        console.log("File changed: ".concat(filename, " (Event: ").concat(eventType, ")"));
        // Restart the server on any change
        startServer();
    }
});
