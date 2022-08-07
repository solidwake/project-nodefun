const fs = require('fs');
const path = require('path');

//* For larger files, Stream can be used for better performance
const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), 'utf8');

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newlorem.txt'));

/* rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
}) */

rs.pipe(ws);