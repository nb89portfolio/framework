"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptTranspile = typescriptTranspile;
var child_process_1 = require("child_process");
function typescriptTranspile() {
    try {
        (0, child_process_1.exec)('tsc');
    }
    catch (error) { }
}
