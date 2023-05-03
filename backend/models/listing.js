"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/**Functions for Listing class */

class Listing {
    /**Creates a new listing
     * 
     * UserId should come from logged-in user
     * Data should include {itemId, price}
     * 
     * Returns {userId, itemId, price, timePosted}
     */

    static async create(userId, data) {
        const result = await db.query(
            `INSERT INTO listings (user_id,
                                   item_id,
                                   price)
             VALUES ($1, $2, $3)
             RETURNING user_id AS "userId", item_id AS "itemId", price, time_posted AS "timePosted"`,
            [
                userId,
                data.itemId,
                data.price
            ]
        );

        let listing = result.rows[0];

        return listing;
    }

    /** Given a listing id, returns data about the listing.
     * 
     * Returns {id, username, item, price, timePosted, timeSold}
     * where item is {fileName, type, name}
     * 
     * Throws NotFoundError if not found.
     */
    static async get(id) {
        const listingRes = await db.query(
            `SELECT id,
                    user_id AS "userId",
                    item_id AS "itemId",
                    price,
                    time_posted AS "timePosted",
                    time_sold AS "timeSold
            FROM listings
            WHERE id = $1`, [id]);

        const listing = listingRes.rows[0];

        if (!listing) throw new NotFoundError(`Listing not found: ${id}`);

        //Replace userId and itemId with appropriate information from respective tables
        const userRes = await db.query(
            `SELECT username
            FROM users
            WHERE user_id = $1`, [listing.userId]);

        delete listing.userId;
        listing.username = userRes.rows[0];

        const itemRes = await db.query(
            `SELECT file_name AS "fileName",
                    type,
                    name
            FROM items
            WHERE id = $1`, [listing.itemId]);

        delete listing.itemId;
        listing.item = itemRes.rows[0];

        return listing;
    }
}

module.exports = Listing;