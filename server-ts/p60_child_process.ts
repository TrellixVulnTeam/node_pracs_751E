import { spawn } from "child_process";

const pwd = spawn("pwd");

const strReturn = (keyword:string, data:string):string =>{
    return `${keyword}: ${data}`
}

pwd.stdout.on("data",(data)=>{
    const logString = strReturn("stdout", data);
    console.log(logString);
});

pwd.stderr.on("data",(data)=>{
    const logString = strReturn("stderr", data);
    console.log(logString);
});
pwd.on("exit",(errCode)=>{
    const logString = strReturn("childProcess exited with code", errCode.toString());
    console.log(logString);
});
