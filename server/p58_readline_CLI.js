"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readLine = require("readline");
var cli_Interface = readLine.createInterface(process.stdin, process.stdout, null);
cli_Interface.question(">> what is the meaning of your lives?", function (answer) {
    console.log("About meaning of your lives, you answered: " + answer);
    cli_Interface.setPrompt(">>");
    cli_Interface.prompt();
});
var closeInterface = function () {
    console.log("Leaving interface...");
    process.exit();
};
cli_Interface.on("line", function (input) {
    if (input.trim() == ".leave") {
        closeInterface();
        return;
    }
    else {
        console.log("Repeating Command " + input);
    }
    cli_Interface.setPrompt(">>");
    cli_Interface.prompt();
});
cli_Interface.on("close", function () {
    console.log("interface close Event emitted!");
    closeInterface();
});
//# sourceMappingURL=p58_readline_CLI.js.map