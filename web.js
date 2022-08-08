const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

//* Listens for and emits the event
const logEvents = require('./events');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

//* Initialize object
const myEmitter = new MyEmitter();

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf8');
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.webp':
            contentType = 'image/webp';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                :contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    //* Makes .html extension not required in the browser        
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        //* Serve the file
        serveFile(filePath, contentType, res);
    } else {
        //* Redirects
        switch (path.parse(filePath).base) {
            case 'oldpage.html':
                res.writeHead(301, {'Location': '/newpage.html'});
                res.end();
                break;
            case 'wwwpage.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                //* Serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* //* Add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

//* Emit event
myEmitter.emit('log', 'log event emitted!'); */
