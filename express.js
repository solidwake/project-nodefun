const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/events');
const errorHandler = require('./middleware/errorhandler')
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.google.com', /* 'https://www.yoursite.com', 'https://yoursite.com', */ 'http://127.0.0.1:5500', 'http://locatlhost:5000']
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
app.use(cors(corsOptions));

// Built in Middleware to handle url encoded data (form data)
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended:false }));

// Built in Middleware for JSON
app.use(express.json());

// Built in Middleware for serving static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/newpage(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'newpage.html'));
});

app.get('/oldpage(.html)?', (req, res) => {
    res.redirect(path.join(301, '/newpage.html')); // Express sends a 302 by default
});

// Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello Node!');
})

// Chaining Route Handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }  
});

/* app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.message);
}) */

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));