"use strict";

//Setup for instanook database

const { Client } = require("pg");
const { getDatabaseUri } = require("./config")

let db;

//adding in rejectUnauthorized helps with connection to Heroku, but can lead to security concerns
if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    db = new Client({
        connectionString: getDatabaseUri()
    });
}

db.connect();

module.exports = db;