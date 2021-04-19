'use strict';

// require ('dotenv').config();

// 3rd party package
const express = require('express'); // we npm i'd express -> now it's available -> now we require it to use it in our app
const app = express();
// const port = process.env.PORT || 3000;

// internal - custom node module
const stamper = require('./middleware/stamper.js');
const notFoundHandler = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');

app.get('/', stamper, (req, res) => {
    res.status(200).send('Hello World')
})

// route level mw - happens "in the middle" of the process
app.get('/data', stamper, (req, res) => {
    let outputObject = { 
        10: 'even',
        5: 'odd',
        'time': req.timestamp 
    }

    res.status(200).json(outputObject);
});

app.get('/bad', (req, res, next) => {
    next('you messed up'); // when you pass "next" anything, you are now "nexting" this to your next middleware function
});

// app.use -> global mw  function -> every request is ran through this

// error handlers live at the bottom of your server file
app.use('*', notFoundHandler);
app.use(errorHandler);

// CLIENT -> req -> SERVER -> res -> CLIENT


function start(port){
    app.listen(port, () => {
        console.log(`server up on ${port}`);
    });
};

module.exports = {
    app: app,
    start: start
}