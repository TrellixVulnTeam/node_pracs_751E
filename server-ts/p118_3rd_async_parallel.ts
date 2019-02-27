import { parallel } from "async";
import * as fs from "fs";
const statics = "/home/junehan/Work/mycode/nodePracs/static";
try {
    parallel({
        data1: (callback) => {
            fs.readFile(`${statics}/p107/data1.txt`, { encoding: "utf8" }, (err, data) => {
                callback(err, data);
            });
        },
        data2: (callback) => {
            fs.readFile(`${statics}/p107/data2.txt`, { encoding: "utf8" }, (err, data) => {
                callback(err, data);
            });
        },
        data3: (callback) => {
            fs.readFile(`${statics}/p107/data3.txt`, { encoding: "utf8" }, (err, data) => {
                callback(err, data);
            });
        },
    },
        (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log("done");
        });
} catch (err) {
    console.log(err);
}