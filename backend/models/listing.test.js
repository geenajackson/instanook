const db = require("../db.js");
const { BadRequestError } = require("../expressError.js");
const Listing = require("./listing.js")

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
        INSERT INTO listings (id, user_id, item_id, price)
        VALUES (1, 1, 1, 100000),
        (2, 1, 2, 500),
        (3, 2, 3, 250)`);

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

describe("create", function () {
    let newListing = {
        itemId: 1,
        price: 11000
    };

    test("works", async function () {
        let listing = await Listing.create(1, newListing);
        expect(listing).toEqual({
            userId: 1,
            itemId: 1,
            price: 11000,
            timePosted: expect.anything()
        })

    });
});

// describe("get", function () {
//     test("works", async function () {

//     });
// });

// describe("findAll", function () {
//     test("works: no filter", async function () {

//     });
// });

// describe("addToCart", function () {
//     test("works", async function () {

//     });
// });

// describe("removeFromCart", function () {
//     test("works", async function () {

//     });
// });

// describe("updateType", function () {
//     test("works", async function () {

//     });
// });

// describe("sell", function () {
//     test("works", async function () {

//     });
// });