import * as http from "http";
const options: http.RequestOptions = {
    protocol:"http:",
    method: "GET",
    socketPath: "/tmp/node-server-sock",
    path: "/?file=sample.txt",
};

const reqB = http.request(options, (res) => {
    setResponseEvent(res);
});
reqB.setSocketKeepAlive(true);
startRequestEvent(reqB);
function setResponseEvent(res: http.IncomingMessage): http.IncomingMessage {
    console.log("Client-response callback--");
    console.log(`Status: ${res.statusCode}`);
    console.log(`header: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (data) => {
        console.log(`CLIENT<=server: ${data}\n`);
    });
    res.on("error", (err) => {
        console.log(`CLIENT-error: ${err.message}`);
    });
    res.on("end", () => {
        console.log("CLIENT: res.end()");
    });
    return res;
}
function startRequestEvent(req: http.ClientRequest): void {
    req.on("error", (err) => {
        console.log(`problem with request: ${err.message}`);
    });
    req.write("message from client.",(err)=>{
        if(err){
            console.log(err.message);
        }   else{
            console.log("message just sent.");
        }
    });
    req.on("close",()=>{
        console.log("req close event emitted!");
    });
}


