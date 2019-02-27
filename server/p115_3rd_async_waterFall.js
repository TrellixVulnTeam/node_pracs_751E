"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var async_1 = require("async");
var path = require("path");
var readData = function (callback) {
    fs.readFile(path.join(__dirname, "../static/", "p115_sampleOrigin.txt"), "utf8", function (err, data) {
        callback(err, data + " - 1readData");
    });
}, modify = function (text, callback) {
    var adjdata = text.replace(/somecompany\.com/g, "buringBird.net");
    callback(null, adjdata + " -2modify");
}, writeData = function (text, callback) {
    fs.writeFile(path.join(__dirname, "../static/", "p115_sample.txt"), text, function (err) {
        callback(err, text + " - 3writeData");
    });
};
try {
    async_1.waterfall([
        readData, modify, writeData
    ], function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    console.log("afterwaterFall");
}
catch (err) {
    console.log(err.message);
}
//# sourceMappingURL=p115_3rd_async_waterFall.js.map