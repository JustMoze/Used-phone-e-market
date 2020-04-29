require('dotenv').config();
const express = require('express');
const config = require('config');
const router = require('./routes/index');
const userRoute = require('./routes/users');
const phonesRoute = require('./routes/phones');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();

// Routes
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/', router);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/phones', phonesRoute);

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
