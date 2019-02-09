import *as readLine from "readline";
const cli_Interface = readLine.createInterface(process.stdin,process.stdout,null);
cli_Interface.question(">> what is the meaning of your lives?",(answer)=>{
    console.log("About meaning of your lives, you answered: "+ answer);
    cli_Interface.setPrompt(">>");
    cli_Interface.prompt();
});

const closeInterface = ()=>{
    console.log("Leaving interface...");
    process.exit();
}
cli_Interface.on("line",(input)=>{
    if(input.trim() == ".leave"){
        closeInterface();
        return;
    }   else{
        console.log(`Repeating Command ${input}`);
    }
    cli_Interface.setPrompt(">>");
    cli_Interface.prompt();
});
cli_Interface.on("close",()=>{
    console.log("interface close Event emitted!");
    closeInterface();
});