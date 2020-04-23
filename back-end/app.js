require('dotenv').config();
const express = require('express');
const config = require('config');
const router = require('./routes/index');
const userRoute = require('./routes/users');
const mongoose = require('mongoose');
const app = express();

// Routes
app.use(express.json());
app.use('/', router);
app.use('/api/users', userRoute);

const PORT = process.env.PORT || config.get('port');
// connect to db
const db = config.get('db');

// process.env.DB
mongoose.set('useCreateIndex', true);
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Successfully connected to database');
    }
);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
