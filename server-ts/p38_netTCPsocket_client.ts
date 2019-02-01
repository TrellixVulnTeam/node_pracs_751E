import * as net from "net";

process.stdin.resume();

const client = net.connect({
    host:"localhost", port:8000
}, ()=>{
    console.log('client connection created!');
});

client.on("data",(data)=>{
    console.log(`${data} from client..`);
});
client.on("end",()=>{
    console.log("client end event");
});
client.on("close",()=>{
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