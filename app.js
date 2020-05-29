require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(console.log);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => console.log(`Server starter on port ${process.env.PORT}`));