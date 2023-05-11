"use strict";

/** Routes for listings. */

const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth")
const Listing = require("../models/listing");
const User = require("../models/user")
const Item = require("../models/item");

const router = express.Router({ mergeParams: true });


/** POST / { listing } => { listing }
 *
 * listing should be {  }
 *
 * Returns { id,  }
 *
 * Authorization required: logged in
 */
router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {

    }
    catch (e) {
        return next(e);
    }
})