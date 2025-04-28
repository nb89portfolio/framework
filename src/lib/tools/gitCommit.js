"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var readline_1 = __importDefault(require("readline"));
function gitCommit() {
    try {
        var rl_1 = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl_1.question('Commit message: ', function (message) {
            rl_1.close();
            (0, child_process_1.exec)("git add . && git commit -m \"".concat(message, "\" && git push origin dev"), function (error, stdout, stderr) {
                if (error)
                    console.error(error);
                if (stderr)
                    console.error(stderr);
                console.log(stdout);
            });
        });
    }
    catch (error) {
        console.error(error);
    }
}
gitCommit();
