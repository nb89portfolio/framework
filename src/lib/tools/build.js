"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function build() {
    try {
        (0, child_process_1.exec)('tsc', function (error, stdout, stderr) {
            if (error)
                console.error(error);
            if (stderr)
                console.error(stderr);
            console.log(stdout);
        });
    }
    catch (error) {
        console.error(error);
    }
}
build();
