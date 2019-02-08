"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var options = {
    protocol: "http:",
    method: "GET",
    socketPath: "/tmp/node-server-sock",
    path: "/?file=sample.txt",
};
var reqB = http.request(options, function (res) {
    setResponseEvent(res);
});
reqB.setSocketKeepAlive(true);
startRequestEvent(reqB);
function setResponseEvent(res) {
    console.log("Client-response callback--");
    console.log("Status: " + res.statusCode);
    console.log("header: " + JSON.stringify(res.headers));
    res.setEncoding("utf8");
    res.on("data", function (data) {
        console.log("CLIENT<=server: " + data + "\n");
    });
    res.on("error", function (err) {
        console.log("CLIENT-error: " + err.message);
    });
    res.on("end", function () {
        console.log("CLIENT: res.end()");
    });
    return res;
}
function startRequestEvent(req) {
    req.on("error", function (err) {
        console.log("problem with request: " + err.message);
    });
    req.write("message from client.", function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("message just sent.");
        }
    });
    req.on("close", function () {
        console.log("req close event emitted!");
    });
}
//# sourceMappingURL=p53_UNIXsocket_http_client.js.map