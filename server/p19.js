"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
const path = require("path");
const writeNums = (res) => {
    let counter = 0;
    for (let i = 0; i < 100; i++) {
        counter++;
        res.write(`${counter} \n`);
    }
};
http.createServer((req, res) => {
    console.log(req.url);
    const query = url.parse(req.url).query;
    const fileName = `${querystring.parse(query)["file"]}.txt`;
    console.log("server open port 8000");
    res.writeHead(200, { "Content-Type": "text/plain" });
    writeNums(res);
    setTimeout(() => {
        console.log(`opening ${fileName}`);
        fs.readFile(path.join(__dirname, "../", "static/", fileName), { encoding: "utf8" }, (err, data) => {
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