import * as fs from "fs";
import { waterfall as waterfall } from "async";
import * as path from "path";


const readData = (callback) => {
    fs.readFile(path.join(__dirname, "../static/", "p115_sampleOrigin.txt"), "utf8", (err, data) => {
        callback(err, `${data} - 1readData`);
    });
},
    modify = (text, callback) => {
        const adjdata = text.replace(/somecompany\.com/g, "buringBird.net");
        callback(null, `${adjdata} -2modify`);
    },
    writeData = (text, callback) => {
        fs.writeFile(path.join(__dirname, "../static/", "p115_sample.txt"), text, (err) => {
            callback(err, `${text} - 3writeData`);
        });
    };

try {
    waterfall([
        readData, modify, writeData
    ],
        (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    console.log("afterwaterFall");
} catch (err) {
    console.log(err.message);
}