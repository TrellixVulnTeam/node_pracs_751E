"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("listening", function () {
    var addr = server.address();
    for (var _i = 0, _a = Object.keys(addr); _i < _a.length; _i++) {
        var key = _a[_i];
        console.log(key + ": " + addr[key]);
    }
});
server.on("message", function (msg, rinfo) {
    console.log("message: " + msg + " from " + rinfo.address + ":" + rinfo.port);
});
server.bind(8124, "localhost");
//# sourceMappingURL=p56_UDPsocket_server.js.map