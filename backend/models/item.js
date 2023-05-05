"use strict";

const axios = require("axios")

const ACNH_API_URL = "https://acnhapi.com/v1"
const db = require("../db");
const { BadRequestError } = require("../expressError")

/**Related functions for items */

class Item {
    /**Check for item in database
     * 
     * If item is found, returns {fileName, type, name}
     * 
     * If not, returns false.
     */

    static async check(fileName) {
        const result = await db.query(
            `SELECT file_name AS "fileName",
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
     * Given a filename and a type, add checks the ACNH API to see if the item exists; if it does, it is added.
     * 
     * Returns {fileName, type, name}.
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
                RETURNING file_name AS "fileName", type, name`,
                [fileName, type, res.data.name['name-USen']],
            );

            const item = newItem.rows[0];

            return item;
        }
        catch (e) {
            throw new BadRequestError(`Item not found: ${fileName}`)
        }

    }
};

module.exports = Item;