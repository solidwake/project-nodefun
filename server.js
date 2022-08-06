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

// Common Core Modules (CommonJS)
const os = require('os');
const path = require('path');

console.log(os.type()); // Darwin (MacOS)
console.log(os.version()); // Darwin Kernel Version 20.6.0: Tue Jun 21 20:50:28 PDT 2022; root:xnu-7195.141.32~1/RELEASE_X86_64
console.log(os.homedir()); // /Users/idris

console.log(__dirname); // /Users/idris/Desktop/projects/project-nodefun
console.log(__filename); // /Users/idris/Desktop/projects/project-nodefun/server.js

// Path
console.log(path.dirname(__filename)); // /Users/idris/Desktop/projects/project-nodefun
console.log(path.basename(__filename)); // server.js
console.log(path.extname(__filename)); // .js

console.log(path.parse(__filename));
/* {
    root: '/',
    dir: '/Users/idris/Desktop/projects/project-nodefun',
    base: 'server.js',
    ext: '.js',
    name: 'server'
} */