const express = require('express');
const path = require('path');

const app = express();
const resourceRouter = require('./routes/resourceRouter');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/resource', resourceRouter);

module.exports = app;
