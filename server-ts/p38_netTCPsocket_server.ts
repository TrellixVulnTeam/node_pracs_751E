import * as net from "net";
class TCPServer {
    public app: net.Server;
    public clientSockets: net.Socket[] = [];
    constructor() {
        this.app = net.createServer();
        this.serverConfigs();
    }
    public static bootstrap() {
        return new TCPServer();
    }
    private socketConfigs(clientSocket: net.Socket): void {
        this.clientSockets.push(clientSocket);
        console.log(`server :client connected to server, all users:${this.clientSockets.length}`);
        clientSocket.on("data",(data)=>{
            console.log(`recevied msg:${data.toString()}`);
            if(data.toString().trim().toLowerCase() == "quit"){
                clientSocket.write(">>> disconnect order requested!");
                return clientSocket.end();
            }
            this.clientSockets.forEach((otherSocket)=>{
                if(otherSocket !== clientSocket){
                    otherSocket.write(data);
                }
            });
        });
        clientSocket.on("close",(isError)=>{
            const index =this.clientSockets.indexOf(clientSocket);
            if(index !== -1){
                this.clientSockets.splice(index, 1);
            }
        });
    }
    private serverConfigs() {
        this.app.on("connection", (socket) => {
            this.socketConfigs(socket);
        });
        this.app.on("error", (err) => {
            console.log(`error Message from server : ${err.message}`);
        });
        this.app.on("close", () => {
            console.log("close server");
        });
    }
}

const singleServer = TCPServer.bootstrap();
singleServer.app.listen(8000,()=>{
    console.log("server opende at port 8000");
})