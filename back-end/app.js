require('dotenv').config()
const express = require('express');
const config = require('config');
const router = require('./routes/index');
const mongoose = require('mongoose');
const app = express();

// Routes
app.use('/', router);

const PORT = process.env.PORT || config.get("port");
// connect to db

mongoose.connect(process.env.DB,  { useNewUrlParser: true } ,  () => {
    console.log('Successfully connected to database');
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));