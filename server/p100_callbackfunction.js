"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var obj = function () { };
obj.prototype.doSomthing = function (arg1, arg2_) {
    var arg2 = typeof (arg2_) === "string" ? arg2_ : null;
    var callback_ = arguments[arguments.length - 1];
    var callback = (typeof (callback_) == 'function' ? callback_ : null);
    if (!arg2) {
        return callback(new Error("second argument missing or not a string."));
    }
    callback(null, arg1);
};
var test = new obj();
try {
    test.doSomthing("test", "3.55", function (err, value) {
        if (err) {
            throw err;
        }
        console.log(value);
    });
}
catch (err) {
    console.error(err);
}
;
function newPromise(filename) {
    var destination = path.join(__dirname, "../static", filename);
    var promise = new Promise(function (res, rej) {
        fs.stat(destination, function (err, stats) {
            if (err) {
                rej(err.message);
                return promise;
            }
            else if (!stats.isFile()) {
                res(destination + " is not a file, but directories");
                return promise;
            }
            else {
                fs.readFile(destination, function (err, data) {
                    if (err) {
                        rej(err.message);
                    }
                    else {
                        var result = data.toString("utf8", 0, data.length);
                        res(result);
                    }
                });
            }
        });
    });
    return promise;
}
var myasync = newPromise("sample.txt").then(function (data) {
    console.log(data);
}, function (errmsg) {
    console.log(errmsg);
});
var myasync2 = newPromise("samssple.txt").then(function (data) {
    console.log(data);
}, function (errmsg) {
    console.log(errmsg);
});
console.log('endofcode');
//# sourceMappingURL=p100_callbackfunction.js.map