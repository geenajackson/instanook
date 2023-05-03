"use strict";

//Middleware to ensure JWT authentication and logged-in users

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError")

/*authenticateJWT

If a token is provided, the token will be verified and the payload
stored on res.locals (from Express). 

authHeader.replace line trims the header to allow for JWT verification.

No error is raised if no token provided or the token is not valid.
*/

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    }
    catch (e) {
        return next();
    }
}

/*ensureLoggedIn

Used to check if a user is logged in.

If false, raises an Error.

*/

function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    }
    catch (e) {
        return next(e);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn
}