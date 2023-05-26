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
 * listing data should include { userId, itemId, price}
 *
 * Returns {userId, itemId, price, timePosted }
 *
 * Authorization required: logged in
 */
router.post("/", async function (req, res, next) {
    try {
        const listing = await Listing.create(req.body);
        return res.json({ listing });
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

/** POST / cart/[userId]/[listingId] => { listing }
 * 
 * Adds a listing to a user's cart.
 * Returns {cartId, listingId, listingType}
 *
 * Authorization required: logged in
 */

router.post("/cart/:userId/:listingId", ensureLoggedIn, async function (req, res, next) {
    try {
        const cart = await Listing.addToCart(req.params.listingId, req.params.userId);
        return res.json({ cart });
    }
    catch (e) {
        return next(e);
    }
})

/** PATCH / cart/[listingId] => { listing }
 * 
 * Data includes: {listingId, sellerId, buyerId}
 * 
 * Updates listings to have a type of "sold" and "bought" and a time sold.
 * Returns {id, timeSold}
 *
 * Authorization required: logged in
 */

router.patch("/cart/sell", ensureLoggedIn, async function (req, res, next) {
    try {
        const cart = await Listing.sell(req.body.listingId, req.body.sellerId, req.body.buyerId);
        return res.json({ cart })
    }
    catch (e) {
        return next(e);
    }
})

/** DELETE / cart/[cartId] => { id }
 * 
 * Given an id from user_listings as cartId, removes listing from cart.
 * 
 * This deletes the entry from the table.
 * 
 * Returns {id}
 *
 * Authorization required: logged in
 */

router.delete("/cart/:cartId", async function (req, res, next) {
    try {
        const cart = await Listing.removeFromCart(req.params.cartId);
        return res.json({ cart });
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;