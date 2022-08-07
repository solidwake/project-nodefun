const fs = require('fs');

//* Exists Sync method checks if a directory exists. If so, it will not overwrite the directory
if(!fs.existsSync('./new',)) {
    //* mkdir creates a new directory
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory created.');
    })
}

if(fs.existsSync('./new',)) {
    //* rmdir removes a new directory
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory removed.');
    })
}

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})