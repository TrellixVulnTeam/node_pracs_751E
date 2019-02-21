import * as fs from "fs";
import * as path from "path";
import * as util from "util";
const targetDir = path.join(__dirname, "../static/", "./p107/");
const writeStream = fs.createWriteStream(path.join(targetDir, "log.txt"), { encoding: "utf8", flags: "a", mode: 0o666 });
try {
    fs.readdir(targetDir, (err, files) => {
        if (err) throw err;
        files.forEach((name) => {
            if (name !== "log.txt") {
                fs.stat(path.join(targetDir, name), (err, stats) => {
                    if (err) throw err;
                    if (stats.isFile()) {
                        fs.readFile(path.join(targetDir, name), { encoding: "utf8" }, (err, data) => {
                            if (err) throw err;
                            const adjData = data.replace(/somecompany\.com/g, "burningBird.net");
                            fs.writeFile(path.join(targetDir, name), adjData, function (err) {
                                if (err) throw err;
                                writeStream.write(`changes ${name}. \n`, (err) => {
                                    if (err) throw err;
                                    console.log(`writeStream-callback done. ${name}`);
                                });
                                console.log(`writeStream done. ${name}`);
                                console.log(`${name} write-callback done.`)
                            });
                            console.log(`${name} write done.`);
                            console.log(`${name} read-callback done.`)
                        });
                        console.log(`${name} read done.`)
                    }
                })
            }
        })
    })
} catch (err) {
    util.inspect(err);
}