"use strict";

/** Routes for listings. */

const express = require("express")
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

/** GET / =>
 *   { listings: [{ id, username, itemName, itemFileName, itemType, price, timePosted, timeSold, listingType }, ...]}
 *
 * Can provide search filter in query:
   * - itemType
   * - itemName (will find case-insensitive, partial matches)
   * - user (will get first matching user)
   * - maxPrice
   * - listingType
 */

router.get("/", async function (req, res, next) {
    const q = req.query;

    try {
        const listings = await Listing.findAll(q);
        return res.json({ listings });
    } catch (err) {
        return next(err);
    }
});

/** GET / [id] => { listing }
 *
 * Returns {id, username, item, price, timePosted, timeSold, listingType}
 * where item is {fileName, type, name}
 *
 * Authorization required: none
 */
router.get("/:id", async function (req, res, next) {
    try {
        const listing = await Listing.get(req.params.id);
        return res.json({ listing });
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;