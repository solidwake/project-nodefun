console.log('Hello World');
// console.log(global);
/* <ref *1> Object [global] {
  global: [Circular *1],
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  structuredClone: [Function: structuredClone],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 194.82135999947786,
      nodeStart: 44.38122799992561,
      v8Start: 64.31922800093889,
      bootstrapComplete: 174.9443470016122,
      environment: 111.24100300297141,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1659819878950.572
  },
  fetch: [AsyncFunction: fetch]
} */

//* Common Core Modules (CommonJS)
const os = require('os');
const path = require('path');
const math = require('./math'); //* Can be destructured - const { add, subtract, multiply, divide } = require(./math);
// const fs = require('fs');
const fsPromises = require('fs').promises;

console.log(os.type()); //* Darwin (MacOS)
console.log(os.version()); //* Darwin Kernel Version 20.6.0: Tue Jun 21 20:50:28 PDT 2022; root:xnu-7195.141.32~1/RELEASE_X86_64
console.log(os.homedir()); //* /Users/idris

console.log(__dirname); //* /Users/idris/Desktop/projects/project-nodefun
console.log(__filename); //* /Users/idris/Desktop/projects/project-nodefun/server.js

//* Path
console.log(path.dirname(__filename)); //* /Users/idris/Desktop/projects/project-nodefun
console.log(path.basename(__filename)); //* server.js
console.log(path.extname(__filename)); //* .js
console.log(path.parse(__filename));
/* {
    root: '/',
    dir: '/Users/idris/Desktop/projects/project-nodefun',
    base: 'server.js',
    ext: '.js',
    name: 'server'
} */

console.log(math.add(3, 4)); //* 7

//* FS (File System)
//* Read a file
// fs.readFile('./files/starter.txt', /* 'utf8' parameter here removes the need for toString() */ (err, data) => {
/*     if (err) throw err;
    console.log(data); // <Buffer 54 68 69 73 20 69 73 20 74 68 65 20 73 74 61 72 74 65 72 20 74 65 78 74 20 66 69 6c 65 2e>
    console.log(data.toString()); // 'This is the starter text file.'
}) */

//! Per NodeJS documentation, you must exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})

//! Best practice: Do this instead of hard coding file paths
/* fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
}) */


//* Write a file - Nesting isn't necessary here. This nesting simply ensures that the functions are excecuted sequentially. If not, the asynchronus nature of NodeJS will return/execute based on the event loop. This is actually the beginning of callback hell.
/* fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!', (err) => {
    if (err) throw err;
    console.log('Write complete.');

    //* Append (Update) a file. Will also create a file if it doesn't exist, will not create a directory
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nNow what do you want?', (err) => {
        if (err) throw err;
        console.log('Append complete.');

        //* Rename a file
        fs.rename(path.join(__dirname, 'files', 'reply.txt'), './files/newreply.txt', (err) => {
            if (err) throw err;
            console.log('Rename complete.');
        })
    })
}) */

//* Promises
const fileOpsRead = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

fileOpsRead();

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        // Unlink deletes the file
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'write.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'write.txt'), '\nWrite to files this way.');
        await fsPromises.rename(path.join(__dirname, 'files', 'write.txt'), path.join(__dirname, 'files', 'writenow.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'writenow.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.error(err);
    }
}

fileOps();