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
     * Adds to user_listings as a "curr" listing
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

        const currList = await db.query(
            `INSERT INTO user_listings (user_id,
                                        listing_id,
                                        listing_type)
            VALUES ($1, $2, $3)`,
            [userId, listing.id, "curr"]
        )

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

        const listTypeRes = await db.query(
            `SELECT listing_type AS "listingType",
            FROM user_listings
            WHERE listing_id = $1`, [id]
        );

        listing.type = listTypeRes.rows[0];

        return listing;
    }

    /** Find all listings (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - itemType
   * - itemName (will find case-insensitive, partial matches)
   * - user (will get first matching user)
   * - maxPrice
   * - listingType
   *
   * Returns [{ id, username, item_name, item_type, price, time_posted, time_sold, listing_type }, ...]
   * */

    static async findAll({ itemType, itemName, username, maxPrice, listingType } = {}) {
        let query = `SELECT l.id,
                            ul.user_id AS "userId",
                            i.name AS "itemName",
                            i.type AS "itemType",
                            l.price,
                            l.time_posted AS "timePosted",
                            l.time_sold AS "timeSold"
                            ul.listing_type AS "listingType"
                     FROM listings AS l 
                     JOIN items AS i ON i.id = l.item_id
                     JOIN user_listings AS ul ON ul.listing_id = l.id`;
        let whereExpressions = [];
        let queryValues = [];

        // For each possible search term, add to whereExpressions and
        // queryValues so we can generate the right SQL

        if (itemType !== undefined) {
            queryValues.push(`%${itemType}%`);
            whereExpressions.push(`itemType ILIKE $${queryValues.length}`);
        }

        if (itemName !== undefined) {
            queryValues.push(`%${itemName}%`);
            whereExpressions.push(`itemName ILIKE $${queryValues.length}`);
        }

        //uses the username query to find the id of user
        if (username !== undefined) {
            const usernameRes = await db.query(`
            SELECT id
            FROM users
            WHERE username ILIKE $1`, [username]);

            const userId = usernameRes.rows[0]

            queryValues.push(userId);
            whereExpressions.push(`userId = $${queryValues.length}`);
        }

        if (maxPrice !== undefined) {
            queryValues.push(maxPrice);
            whereExpressions.push(`price <= $${queryValues.length}`);
        }

        if (listingType !== undefined) {
            queryValues.push(`%${listingType}%`);
            whereExpressions.push(`listingType ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalize query and return results

        query += " ORDER BY timePosted";
        const listingsRes = await db.query(query, queryValues);
        return listingsRes.rows;
    }

    /**Given a listing id and user id, adds an item to user's cart.
     * 
     * This sets the user_listings listing_type to "cart"
     * 
     * Returns {listing_id, listing_type}
     * 
     * Throws NotFoundError if no listing id found.
     */

    static async addToCart(listingId, userId) {
        const listRes = await db.query(
            `INSERT INTO user_listings(
                user_id,
                listing_id,
                listing_type)
             VALUES ($1, $2, $3)
             RETURNING id AS "cartId", listing_id AS "listingId", listing_type AS "listingType"`, [userId, listingId, "cart"]
        );

        const listing = listRes.rows[0];

        if (!listing) throw new NotFoundError(`Listing not found: ${id}`);

        return listing;
    }

    /**Given an id from user_listings as cartId, removes listing from cart.
    * 
    * This deletes the entry from the table.
    * 
    * Returns {id}
    * 
     * Throws NotFoundError if no cartId found.
    */

    static async removeFromCart(cartId) {
        const res = await db.query(
            `DELETE
            FROM user_listings
            WHERE id = $1
            RETURNING id`, [cartId]);

        const listing = res.rows[0];

        if (!listing) throw new NotFoundError(`No listing: ${cartId}`);
    }

    /** Given a listing id and user_id, updates a list type.
     * Types include curr, cart, sold, bought.
     * 
     * Returns {listing_id, listing_type}
     * 
     * Throws NotFoundError if not found.
     */

    static async updateType(listingId, userId, type) {
        const listRes = await db.query(
            `UPDATE user_listings
             SET listing_type = $1
             WHERE listing_id = $2 AND user_id = $3
             RETURNING listing_id AS "listingId", listing_type AS "listingType"`, [type, listingId, userId]
        );

        const listing = listRes.rows[0];

        if (!listing) throw new NotFoundError(`Listing not found: ${id}`);

        return listing;
    }

    /** Given a listing id, updates time_sold to current timestamp.
     * Adds "sold" to seller's user_listings and "bought" to buyer's user_listings
     * 
     * Returns {id, time_sold}
     * 
     * Throws NotFoundError if not found.
     */

    static async sell(listingId, sellerId, buyerId) {
        const listRes = await db.query(
            `UPDATE listings
             SET time_sold = CURRENT_TIMESTAMP
             WHERE id = $1
             RETURNING id, time_sold AS "timeSold"`, [listingId])

        const listing = listRes.rows[0];

        this.updateType(listingId, sellerId, "sold");
        this.updateType(listingId, buyerId, "bought");

        return listing;

    }
}

module.exports = Listing;