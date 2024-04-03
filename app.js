const express = require('express');
const path = require('path');

const app = express();
const resourceRouter = require('./routes/resourceRouter');
const dynamicCore = require('./middleware/dynamicCore');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/resource', resourceRouter);
app.use((req, resp, next) => {
    if (req.url.indexOf('resource') == -1) {
       const response = dynamicCore.resourceObject[req.url];
       if (response) {
          resp.status(200).send(response.getContent());
       }
       else {
          resp.status(404).send('Not Found');
       }
    }
    next();
});

module.exports = app;
