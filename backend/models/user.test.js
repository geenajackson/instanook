"use strict";

const db = require("../db.js");
const { BadRequestError } = require("../expressError.js");
const User = require("./user")

beforeAll(
    async function () {
        //reset tables in db
        await db.query("DELETE FROM items");
        await db.query("DELETE FROM user_listings");
        await db.query("DELETE FROM listings");
        await db.query("DELETE FROM users");

        await db.query(`
        INSERT INTO items (id, file_name, type, name)
        VALUES (1, 'ant00', 'villagers', 'Cyrano'),
        (2, 'common_butterfly', 'bugs', 'common butterfly'),
        (3, 'bitterling','fish', 'bitterling')`);

        await db.query(`
        INSERT INTO users(id, username, password, email, friend_code)
        VALUES (1,
        'testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test1@test.com',
        'SW-1111-1111-1111'),
        (2,
        'testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test2@test.com',
        'SW-2222-2222-2222')`)

        await db.query(`
        INSERT INTO listings (id, user_id, item_id, price, time_sold)
        VALUES (1, 1, 1, 100000, null),
        (2, 1, 2, 500, CURRENT_TIMESTAMP),
        (3, 2, 3, 250, null)`);

        await db.query(`
        INSERT INTO user_listings (user_id, listing_id, listing_type)
        VALUES (1, 1, 'curr'),
        (1, 2, 'sold'),
        (2, 2, 'bought'),
        (2, 3, 'curr'),
        (1, 3, 'cart');`);
    }
);

beforeEach(
    async function () {
        await db.query("BEGIN");
    }
)

afterEach(
    async function () {
        await db.query("ROLLBACK");
    }

)

afterAll(
    async function () {
        await db.end();
    }
);

/************************************** get */

describe("get", function () {
    test("works", async function () {
        let user = await User.get("testuser1");
        expect(user).toEqual({
            id: expect.any(Number),
            username: "testuser1",
            email: "test1@test.com",
            friendCode: "SW-1111-1111-1111",
            cart: [
                {
                    id: expect.any(Number),
                    itemFileName: "bitterling",
                    itemName: "bitterling",
                    price: 250
                }
            ]
        });
    });
    test("works with empty cart", async function () {
        let user = await User.get("testuser2");
        expect(user).toEqual({
            id: expect.any(Number),
            username: "testuser2",
            email: "test2@test.com",
            friendCode: "SW-2222-2222-2222",
            cart: []
        });
    });
})
