"use strict";

/** Express app for Instanook. */

const express = require("express");

//Dependencies for middleware
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./expressError");

//initialize app
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


//404 error to match all other routes
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

//generic error handler to catch any misc. errors
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.log(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});

module.exports = app;