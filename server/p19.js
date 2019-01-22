"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
var writeNums = function (res) {
    var counter = 0;
    for (var i = 0; i < 100; i++) {
        counter++;
        res.write(counter + " \n");
    }
};
http.createServer(function (req, res) {
    console.log(req.url);
    var query = url.parse(req.url).query;
    var fileName = querystring.parse(query)["file"] + ".txt";
    console.log("server open port 8000");
    res.writeHead(200, { "Content-Type": "text/plain" });
    writeNums(res);
    res.write(req.url);
    setTimeout(function () {
        console.log("opening " + fileName);
        fs.readFile(path.join(__dirname, "../", "static/", fileName), { encoding: "utf8" }, function (err, data) {
            if (err) {
                console.log("-----");
                console.log(err.name);
                console.log(err.message);
                console.log("-----");
                res.write(err.message);
            }
            else {
                res.write(data);
            }
            res.end();
        });
    }, 2000);
}).listen(8000);
//# sourceMappingURL=p19.js.map