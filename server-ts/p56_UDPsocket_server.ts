import * as dgram from "dgram";

const server = dgram.createSocket("udp4");
server.on("listening",()=>{
    const addr = server.address();
    for(let key of Object.keys(addr)){
        console.log(`${key}: ${addr[key]}`);
    }
})
server.on("message",(msg,rinfo)=>{
    console.log(`message: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
server.bind(8124,"localhost");