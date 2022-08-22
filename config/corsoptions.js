const whitelist = [
    'https://www.google.com', 
    /* 'https://www.yoursite.com', 
    'https://yoursite.com', */ 
    'http://127.0.0.1:5500', 
    'http://locatlhost:5000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;