"use strict";

/** Shared config for application */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

//set backend port to 3001
const PORT = +process.env.PORT || 3001;

// Use dev database, testing database; or via env variable, production database
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "instanook_test"
        : process.env.DATABASE_URL || "instanook";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
// Factor currently set to 12; can be increased to 13 for added security

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};