import * as fs from "fs";
import * as path from "path";
const obj = () => { };
obj.prototype.doSomthing = function (arg1, arg2_) {
    const arg2 = typeof (arg2_) === "string" ? arg2_ : null;
    const callback_ = arguments[arguments.length - 1];
    const callback = (typeof (callback_) == 'function' ? callback_ : null);
    if (!arg2) {
        return callback(new Error("second argument missing or not a string."));
    }
    callback(null, arg1);
}
const test = new obj();
try {
    test.doSomthing("test", "3.55", (err, value) => {
        if (err) {
            throw err;
        }
        console.log(value);
    });
} catch (err) {
    console.error(err);
};

function newPromise(filename) {
    const destination = path.join(__dirname, "../static", filename);
    const promise = new Promise((res, rej) => {
        fs.stat(destination, (err, stats) => {
            if (err) {
                rej(err.message);
                return promise;
            }
            else if (!stats.isFile()) {
                res(`${destination} is not a file, but directories`);
                return promise;
            } else {
                fs.readFile(destination, (err, data) => {
                    if (err) {
                        rej(err.message);
                    } else {
                        const result = data.toString("utf8", 0, data.length)
                        res(result);
                    }
                });
            }
        })
    }
    );
    return promise;
}

const myasync = newPromise("sample.txt").then(
    (data) => {
        console.log(data);
    },
    (errmsg) => {
        console.log(errmsg);
    }
);
const myasync2 = newPromise("samssple.txt").then(
    (data) => {
        console.log(data);
    },
    (errmsg) => {
        console.log(errmsg);
    }
);
console.log('endofcode');