"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var url = require("url");
var queryStr = require("querystring");
var path = require("path");
var server = http.createServer(function (req, res) {
    req.socket.setEncoding("utf8");
    req.socket.on("data", function (data) {
        console.log(data + " :from client,,,");
        res.write("sample");
        res.end();
        server.unref();
    });
    var query = url.parse(req.url).query;
    var file = queryStr.parse(query).file;
    // content header
    res.writeHead(200, { "Content-Type": "text/plain", "CONNECTION": "keep-alive", "Host": "/tmp/node-server-sock" });
    for (var i = 0; i < 100; i++) {
        res.write(i + "\n");
    }
    var data = fs.readFileSync(path.join(__dirname, "../static/" + file.toString()), { encoding: "utf8" });
    console.log(data);
    res.write(data, function (err) {
        if (err) {
            console.log("server response err: " + err.message);
            server.unref();
        }
        else {
            console.log("server response wrote fine");
        }
        res.end(function () {
            console.log("server response ended.");
            server.unref();
        });
    });
}).listen("/tmp/node-server-sock");
//# sourceMappingURL=p53_UNIXsocket_http_server.js.map