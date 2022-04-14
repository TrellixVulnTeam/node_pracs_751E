#!/home/junehan/.nvm/versions/node/v16.13.2/bin/node
const process = require("process");
let counter = 0;
process.on("beforeExit", (code) => {
	console.log("Process will be exit with exit: ", code);
});

process.on("exit", (code) => {
	console.log("Process exited with code: ", code);
});

/* Your code goes... */
function write(d) {
	process.stdout.write(`data recevied: ${d}: counter: ${counter}\n`);
}
function run_as_async(data, cb) {
	const st = setTimeout(() => {++counter; cb(data + " with setTimeout.")}, 0);
	const nt = process.nextTick(() => {++counter;cb(data + " with tick")});
	const prom = new Promise((res, rej)=> res(data + " with promise1")).then((d) => {++counter;cb(d)});
	const mt = queueMicrotask(() => {++counter;cb(data + " with Microtask")});
	const prom2 = new Promise((res, rej)=> res(data + " with promise2")).then((d) => {++counter;cb(d)});
	console.log(st);
	console.log(nt);
	console.log(mt);
	console.log(prom);
}

function main() {
	run_as_async(`hi at async ${counter}`, write);
	write(`hi at sync.write counter`);
	console.log(`hi at sync.console.logcounter: ${counter}`);
}

main();
write(`all sync finished, EVENT loop.write counter`);
console.log(`all sync finished, EVENT loop.console.log counter`);
/* Your code ends... */

/* OUTPUT
Timeout {
  _idleTimeout: 1,
  _idlePrev: [TimersList],
  _idleNext: [TimersList],
  _idleStart: 69,
  _onTimeout: [Function (anonymous)],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(refed)]: true,
  [Symbol(kHasPrimitive)]: false,
  [Symbol(asyncId)]: 5,
  [Symbol(triggerId)]: 1
}
undefined
undefined
Promise { <pending> }
data recevied: hi at sync.write counter: counter: 0
hi at sync.console.logcounter: 0
data recevied: all sync finished, EVENT loop.write counter: counter: 0
all sync finished, EVENT loop.console.log counter
data recevied: hi at async 0 with tick: counter: 1
data recevied: hi at async 0 with promise1: counter: 2
data recevied: hi at async 0 with Microtask: counter: 3
data recevied: hi at async 0 with promise2: counter: 4
data recevied: hi at async 0 with setTimeout.: counter: 5
Process will be exit with exit:  0
Process exited with code:  0
*/


