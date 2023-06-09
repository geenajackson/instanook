"use strict";

/** Routes for items. */

const express = require("express");
const Item = require("../models/item");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });


/** GET / [name] => { item }
 *
 * Returns { id, fileName, type, name}
 * 
 * Will return only one item.
 *
 * Authorization required: none
 */
router.get("/:name", async function (req, res, next) {
    try {
        const item = await Item.getByName(req.params.name);
        return res.json({ item });
    }
    catch (e) {
        return next(e);
    }
})

/** GET /search/ [name] => { item }
 *
 * Returns [{ id, fileName, type, name},...]
 * 
 * Will return array of items matching name.
 *
 * Authorization required: none
 */
router.get("/search/:name", async function (req, res, next) {
    try {
        const items = await Item.getAllByName(req.params.name);
        return res.json({ items });
    }
    catch (e) {
        return next(e);
    }
})

/** GET / [type] => { items: [{ id, fileName, type, name},...] }
 *
 * Will return an array of items, instead of only one like /:name
 * 
 *Type includes: villagers, fish, bugs, fossils, art
 * 
 * Authorization required: none
 */
router.get("/:type", async function (req, res, next) {
    try {
        const items = await Item.getAllByType(req.params.type);
        return res.json({ items });
    }
    catch (e) {
        return next(e);
    }
})

module.exports = router;