const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
    res.send('Hello Express!');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));