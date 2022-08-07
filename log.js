//* Listens for and emits the event
const logEvents = require('./events');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//* Initialize object
const myEmitter = new MyEmitter();

//* Add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    //* Emit event
    myEmitter.emit('log', 'log event emitted!');
}, 2000);