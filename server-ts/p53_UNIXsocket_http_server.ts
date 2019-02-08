import * as http from "http";
import * as fs from "fs";
import * as url from "url";
import * as queryStr from "querystring";
import * as path from "path";

const server = http.createServer((req, res) => {
    req.socket.setEncoding("utf8");
    req.socket.on("data",(data)=>{
        console.log(data+ " :from client,,,");
        res.write("sample");
        res.end();
        server.unref();
    });
    const query = url.parse(req.url).query;
    const file = queryStr.parse(query).file;
    // content header
    res.writeHead(200, { "Content-Type": "text/plain" ,"CONNECTION":"keep-alive", "Host":"/tmp/node-server-sock"});
    for (let i = 0; i < 100; i++) {
        res.write(i + "\n");
    }
    const data = fs.readFileSync(path.join(__dirname, `../static/${file.toString()}`), { encoding: "utf8" });
    console.log(data);
    res.write(data, (err) => {
        if (err) {
            console.log(`server response err: ${err.message}`);
            server.unref();
        } else {
            console.log(`server response wrote fine`)
        }
        res.end(() => {
            console.log(`server response ended.`);
            server.unref();
        });
    });
}).listen("/tmp/node-server-sock");
