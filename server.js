'use strict';

// require ('dotenv').config();

// 3rd party package
const express = require('express'); // we npm i'd express -> now it's available -> now we require it to use it in our app
const app = express();
// const port = process.env.PORT || 3000;

// internal - custom node module
const stamper = require('./middleware/stamper.js');
const notFoundHandler = require('./handlers/404.js');
const errors = require('./handlers/500.js');

app.get('/test-route', (req, res) => {
    res.json({msg: 'this worked' }); //express gives us the ability to quickly send a json response
});

// route level mw - happens "in the middle" of the process
app.get('/data', stamper, (req, res) => {
    let output = { time: req.timestamp };
    res.json(output);
});

app.get('/purposeful-error', (req, res, next) => {
    next('some words'); // when you pass "next" anything, you are now "nexting" this to your next middleware function
});

// app.use -> global mw  function -> every request is ran through this

// error handlers live at the bottom of your server file
app.use('*', notFoundHandler);
app.use(errors);

// CLIENT -> req -> SERVER -> res -> CLIENT


function start(PORT){
    app.listen(PORT, () => {
        console.log(`server up on ${PORT}`);
    });
};

module.exports = {
    app: app,
    start: start
}