const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

//Returns a signed JWT for user auth via username

function createToken(user) {
    let payload = {
        username: user.username
    };

    return jwt.sign(payload, SECRET_KEY);
};

module.exports = { createToken };