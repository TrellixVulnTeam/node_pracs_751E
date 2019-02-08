"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
process.stdin.resume();
process.stdin.on("data", function (data) {
    console.log(data.toString("utf8"));
    client.send(data, 0, data.length, 8124, "localhost", function (err, bytes) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('succeed');
        }
    });
});
//# sourceMappingURL=p56_UDPsocket_client.js.map