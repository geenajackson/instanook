"use strict";

/** Express app for Instanook. */

const express = require("express");

//Dependencies for middleware
const cors = require("cors");
const morgan = require("morgan");

//initialize app
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

module.exports = app;