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

/**ensureCorrectUser
 * 
 * Used to check if the current user matches the username of the route param
 * 
 * Raises Unauthorized error if usernames do not match.
 */

function ensureCorrectUser(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureCorrectUser
}