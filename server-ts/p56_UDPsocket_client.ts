import * as dgram from "dgram";

const client = dgram.createSocket("udp4");
process.stdin.resume();
process.stdin.on("data",(data)=>{
    console.log(data.toString("utf8"));
    client.send(data,0,data.length,8124,"localhost",
    (err,bytes)=>{
        if(err){
            console.log(err.message);
        }   else{
            console.log('succeed');
        }
    });
});