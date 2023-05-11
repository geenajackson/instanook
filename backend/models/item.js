"use strict";

const axios = require("axios")

const ACNH_API_URL = "https://acnhapi.com/v1"
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError")

/**Related functions for items */

class Item {
    /**Check for item in database
     * 
     * If item is found, returns {id, fileName, type, name}
     * 
     * If not, returns false.
     */

    static async check(fileName) {
        const result = await db.query(
            `SELECT id,
                    file_name AS "fileName",
                    type,
                    name
            FROM items
            WHERE file_name = $1`,
            [fileName],
        );

        const item = result.rows[0];

        if (item) {
            return item;
        } else return false;
    }

    /**Add new item to database.
     * 
     * Given a filename and a type, checks the ACNH API to see if the item exists; if it does, it is added.
     * 
     * Returns {id, fileName, type, name}.
     * 
     * If item cannot be found, returns BadRequestError.
    */
    static async add(fileName, type) {
        try {
            const res = await axios.get(`${ACNH_API_URL}/${type}/${fileName}`);
            const newItem = await db.query(
                `INSERT INTO items
                (file_name,
                type,
                name)
                VALUES ($1, $2, $3)
                RETURNING id, file_name AS "fileName", type, name`,
                [fileName, type, res.data.name['name-USen']],
            );

            const item = newItem.rows[0];

            return item;
        }
        catch (e) {
            throw new BadRequestError(`Item not found: ${fileName}`)
        }
    }

    /**Gets item in database via name.
     * 
     * If item is found, returns {id, fileName, type, name}
     * 
     * If not, returns NotFoundError.
     */

    static async getByName(name) {
        try {
            const result = await db.query(
                `SELECT id,
                        file_name AS "fileName",
                        type,
                        name
                FROM items
                WHERE name ILIKE $1`,
                [`%${name}%`],
            );

            const item = result.rows[0];

            return item;
        }
        catch (e) {
            throw new NotFoundError(`Item not found: ${name}`)
        }
    };

    /**Gets all items in database via type.
     * 
     * Type includes: villagers, fish, bugs, fossils, art
     * 
     * Returns [{id, fileName, type, name},...]
     * 
     * If search cannot be completed, returns BadRequestError.
     */

    static async getAllByType(type) {
        try {
            const result = await db.query(
                `SELECT id,
                            file_name AS "fileName",
                            type,
                            name
                    FROM items
                    WHERE type ILIKE $1`,
                [`%${type}%`],
            );

            const items = result.rows;

            return items;
        }
        catch (e) {
            throw new BadRequestError(`Request could not be completed: ${type}`)
        }
    };
};

module.exports = Item;