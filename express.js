const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsoptions');
const { logger } = require('./middleware/events');
const errorHandler = require('./middleware/errorhandler');
const verifyJWT = require('./middleware/verifyjwt');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built in Middleware to handle url encoded data (form data)
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended:false }));

// Built in Middleware for JSON
app.use(express.json());

// Built in Middleware for serving static files
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

// Route Handlers
/* app.get('/hello(.html)?', (req, res, next) => {
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

app.get('/chain(.html)?', [one, two, three]); */

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