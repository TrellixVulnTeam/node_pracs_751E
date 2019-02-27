"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("async");
var fs = require("fs");
var statics = "/home/junehan/Work/mycode/nodePracs/static";
try {
    async_1.parallel({
        data1: function (callback) {
            fs.readFile(statics + "/p107/data1.txt", { encoding: "utf8" }, function (err, data) {
                callback(err, data);
            });
        },
        data2: function (callback) {
            fs.readFile(statics + "/p107/data2.txt", { encoding: "utf8" }, function (err, data) {
                callback(err, data);
            });
        },
        data3: function (callback) {
            fs.readFile(statics + "/p107/data3.txt", { encoding: "utf8" }, function (err, data) {
                callback(err, data);
            });
        },
    }, function (err, result) {
        if (err)
            throw err;
        console.log(result);
        console.log("done");
    });
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=p118_3rd_async_parallel.js.map