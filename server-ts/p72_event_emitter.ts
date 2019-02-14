import { EventEmitter as E_M } from "events";
import * as fs from "fs";
// util.inherits(inputchecker, E_M);

class InputChecker extends E_M{
    public writeStream:fs.WriteStream;
    constructor(public name:string, file:string) {
        super();
        this.name = name;
        this.writeStream = fs.createWriteStream(`../static/${file}.txt`, {
            flags: "a",
            encoding: "utf8",
            mode: 0o666,
        });
    }
    public check(input:any):void{
        const command = input.toString().trim().substr(0, 3);
        if (command == "wr:") {
            this.emit("write", input.substr(3, input.length));
        } else if (command == "en:") {
            this.emit("end");
        } else {
            this.emit("echo", input);
        }
        
    }
}

const ic = new InputChecker("shelly","EventEmiiter_output");

ic.on("write",(data)=>{
    ic.writeStream.write(data,"utf8");
});
ic.on("echo",(data)=>{
    console.log(`${ic.name} wrote ${data}`);
})
ic.on("end",()=>{
    process.exit();
});

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data",(input)=>{
    ic.check(input);
})