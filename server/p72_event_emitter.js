"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var fs = require("fs");
// util.inherits(inputchecker, E_M);
var InputChecker = /** @class */ (function (_super) {
    __extends(InputChecker, _super);
    function InputChecker(name, file) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.name = name;
        _this.writeStream = fs.createWriteStream("../static/" + file + ".txt", {
            flags: "a",
            encoding: "utf8",
            mode: 438,
        });
        return _this;
    }
    InputChecker.prototype.check = function (input) {
        var command = input.toString().trim().substr(0, 3);
        if (command == "wr:") {
            this.emit("write", input.substr(3, input.length));
        }
        else if (command == "en:") {
            this.emit("end");
        }
        else {
            this.emit("echo", input);
        }
    };
    return InputChecker;
}(events_1.EventEmitter));
var ic = new InputChecker("shelly", "EventEmiiter_output");
ic.on("write", function (data) {
    ic.writeStream.write(data, "utf8");
});
ic.on("echo", function (data) {
    console.log(ic.name + " wrote " + data);
});
ic.on("end", function () {
    process.exit();
});
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (input) {
    ic.check(input);
});
//# sourceMappingURL=p72_event_emitter.js.map