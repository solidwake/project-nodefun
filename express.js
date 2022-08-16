const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/newpage(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'newpage.html'));
});

app.get('/oldpage(.html)?', (req, res) => {
    res.redirect(path.join(301, '/newpage.html')); // Express sens a 302 by default
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Route handlers


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));