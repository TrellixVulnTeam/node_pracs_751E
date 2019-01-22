import * as http from "http";
import * as url from "url";
import * as querystring from "querystring";
import * as fs from "fs";
import *as path from "path";

const writeNums = (res: http.ServerResponse): void => {
    let counter = 0;
    for (let i = 0; i < 100; i++) {
        counter++;
        res.write(`${counter} \n`);
    }
}

http.createServer((req, res) => {
    console.log(req.url);
    const query = url.parse(req.url).query;
    const fileName = `${querystring.parse(query)["file"]}.txt`
    console.log("server open port 8000");
    res.writeHead(200, { "Content-Type": "text/plain" });
    writeNums(res);
    res.write(req.url);
    setTimeout(() => {
        console.log(`opening ${fileName}`);
        fs.readFile(path.join(__dirname, "../","static/",fileName), { encoding: "utf8" }, (err, data) => {
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