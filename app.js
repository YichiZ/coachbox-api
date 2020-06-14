require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(console.log);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const options = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
};

https.createServer(options, app).listen(process.env.PORT, () => console.log(`Server starter on port ${process.env.PORT}`));
