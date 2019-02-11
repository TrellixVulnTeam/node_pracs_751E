"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var pwd = child_process_1.spawn("pwd");
var strReturn = function (keyword, data) {
    return keyword + ": " + data;
};
pwd.stdout.on("data", function (data) {
    var logString = strReturn("stdout", data);
    console.log(logString);
});
pwd.stderr.on("data", function (data) {
    var logString = strReturn("stderr", data);
    console.log(logString);
});
pwd.on("exit", function (errCode) {
    var logString = strReturn("childProcess exited with code", errCode.toString());
    console.log(logString);
});
//# sourceMappingURL=p60_child_process.js.map