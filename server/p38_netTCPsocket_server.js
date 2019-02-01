"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var TCPServer = /** @class */ (function () {
    function TCPServer() {
        this.clientSockets = [];
        this.app = net.createServer();
        this.serverConfigs();
    }
    TCPServer.bootstrap = function () {
        return new TCPServer();
    };
    TCPServer.prototype.socketConfigs = function (clientSocket) {
        var _this = this;
        this.clientSockets.push(clientSocket);
        console.log("server :client connected to server, all users:" + this.clientSockets.length);
        clientSocket.on("data", function (data) {
            console.log("recevied msg:" + data.toString());
            if (data.toString().trim().toLowerCase() == "quit") {
                clientSocket.write(">>> disconnect order requested!");
                return clientSocket.end();
            }
            _this.clientSockets.forEach(function (otherSocket) {
                if (otherSocket !== clientSocket) {
                    otherSocket.write(data);
                }
            });
        });
        clientSocket.on("close", function (isError) {
            var index = _this.clientSockets.indexOf(clientSocket);
            if (index !== -1) {
                _this.clientSockets.splice(index, 1);
            }
        });
    };
    TCPServer.prototype.serverConfigs = function () {
        var _this = this;
        this.app.on("connection", function (socket) {
            _this.socketConfigs(socket);
        });
        this.app.on("error", function (err) {
            console.log("error Message from server : " + err.message);
        });
        this.app.on("close", function () {
            console.log("close server");
        });
    };
    return TCPServer;
}());
var singleServer = TCPServer.bootstrap();
singleServer.app.listen(8000, function () {
    console.log("server opende at port 8000");
});
//# sourceMappingURL=p38_netTCPsocket_server.js.map