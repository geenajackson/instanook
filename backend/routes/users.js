"use strict";

/** Routes for users. */

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/auth")
const User = require("../models/user");

const router = express.Router();

/** GET /[username] => { user }
 *
 * Returns { username, email, friendCode }
 *
 * Authorization required: same user
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;