"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
    notFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config")

/* Functions for User class*/

class User {
    /** Authenticate user with username and password.
     * 
     * Returns {username, email, friendCode}
     * 
     * Throws an UnauthorizedError if the user cannot be found or the password is incorrect.
     */

    static async authenticate(username, password) {
        //will try to find the user first
        const result = await db.query(
            `SELECT username,
                    password,
                    email,
                    friend_code AS "friendCode"
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        //will now check for correct password
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /**Register user with given data.
     * 
     *Returns {username, email, friend_code}
     * 
     *Throws BadRequestError if a duplicate username is found
     */

    static async register({ username, password, email, friendCode }) {
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
            [username],
        );

        //if duplicateCheck finds a user, aka .rows[0]
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Username already exists: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              email,
              friend_code)
            VALUES ($1, $2, $3, $4)
            RETURNING username, email, friend_code AS "friendCode`,
            [
                username,
                hashedPassword,
                email,
                friendCode
            ],
        );

        const user = result.rows[0];

        return user;
    }
}

module.exports = User;