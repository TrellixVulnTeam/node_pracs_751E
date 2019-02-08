"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
// process.stdin.resume();
// const client = net.connect({
//     host:"localhost", port:8000
// }, ()=>{
//     console.log('client connection created!');
// });
var client = new net.Socket();
client.setEncoding("utf8");
client.connect(8000, "localhost", function () {
    console.log("client : I made connection to server successful.");
    client.write("who needs a browser to communicate?");
});
process.stdin.resume();
process.stdin.on("data", function (data) {
    client.write(data);
});
client.on("data", function (data) {
    console.log(data + " from client..");
});
client.on("end", function () {
    console.log("client end event");
});
client.on("close", function () {
    console.log("client close event");
});
// process.stdin.on("data",(data)=>{
//     if(data.toString().trim().toLowerCase() == "quit"){
//         console.log("disconnection request appear!");
//         client.write(data);
//         process.stdin.end();
//     }   else{
//         client.write(data);
//     }
// })
//# sourceMappingURL=p38_netTCPsocket_client.js.map