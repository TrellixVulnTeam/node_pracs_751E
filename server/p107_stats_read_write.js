"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var util = require("util");
var targetDir = path.join(__dirname, "../static/", "./p107/");
var writeStream = fs.createWriteStream(path.join(targetDir, "log.txt"), { encoding: "utf8", flags: "a", mode: 438 });
try {
    fs.readdir(targetDir, function (err, files) {
        if (err)
            throw err;
        files.forEach(function (name) {
            if (name !== "log.txt") {
                fs.stat(path.join(targetDir, name), function (err, stats) {
                    if (err)
                        throw err;
                    if (stats.isFile()) {
                        fs.readFile(path.join(targetDir, name), { encoding: "utf8" }, function (err, data) {
                            if (err)
                                throw err;
                            var adjData = data.replace(/somecompany\.com/g, "burningBird.net");
                            fs.writeFile(path.join(targetDir, name), adjData, function (err) {
                                if (err)
                                    throw err;
                                writeStream.write("changes " + name + ". \n", function (err) {
                                    if (err)
                                        throw err;
                                    console.log("writeStream-callback done. " + name);
                                });
                                console.log("writeStream done. " + name);
                                console.log(name + " write-callback done.");
                            });
                            console.log(name + " write done.");
                            console.log(name + " read-callback done.");
                        });
                        console.log(name + " read done.");
                    }
                });
            }
        });
    });
}
catch (err) {
    util.inspect(err);
}
//# sourceMappingURL=p107_stats_read_write.js.map