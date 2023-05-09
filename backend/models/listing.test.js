"use strict";

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

/************************************** create */
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

/************************************** get */
describe("get", function () {
    test("works", async function () {
        let listing = await Listing.get(2);
        expect(listing).toEqual({
            id: 2,
            username: "testuser1",
            item: {
                fileName: "common_butterfly",
                type: "bugs",
                name: "common butterfly"
            },
            price: 500,
            timePosted: expect.anything(),
            timeSold: expect.anything(),
            listingType: "sold"
        })
    });
});

/************************************** findAll */
describe("findAll", function () {
    test("works: no filter", async function () {
        let listings = await Listing.findAll();
        expect(listings).toEqual([
            {
                id: 1,
                userId: 1,
                itemName: 'Cyrano',
                itemType: 'villagers',
                price: 100000,
                timePosted: expect.anything(),
                timeSold: null,
                listingType: 'curr'
            },
            {
                id: 2,
                userId: 1,
                itemName: 'common butterfly',
                itemType: 'bugs',
                price: 500,
                timePosted: expect.anything(),
                timeSold: expect.anything(),
                listingType: 'sold'
            },
            {
                id: 2,
                userId: 2,
                itemName: 'common butterfly',
                itemType: 'bugs',
                price: 500,
                timePosted: expect.anything(),
                timeSold: expect.anything(),
                listingType: 'bought'
            },
            {
                id: 3,
                userId: 2,
                itemName: 'bitterling',
                itemType: 'fish',
                price: 250,
                timePosted: expect.anything(),
                timeSold: null,
                listingType: 'curr'
            },
            {
                id: 3,
                userId: 1,
                itemName: 'bitterling',
                itemType: 'fish',
                price: 250,
                timePosted: expect.anything(),
                timeSold: null,
                listingType: 'cart'
            }
        ]);
    });
    test("works: by itemType", async function () {
        let listings = await Listing.findAll({ itemType: "villagers" });
        expect(listings).toEqual([{
            id: 1,
            userId: 1,
            itemName: 'Cyrano',
            itemType: 'villagers',
            price: 100000,
            timePosted: expect.anything(),
            timeSold: null,
            listingType: 'curr'
        }]);

    });
    test("works: by itemName", async function () {
        let listings = await Listing.findAll({ itemName: "common" });
        expect(listings).toEqual([{
            id: 2,
            userId: 1,
            itemName: 'common butterfly',
            itemType: 'bugs',
            price: 500,
            timePosted: expect.anything(),
            timeSold: expect.anything(),
            listingType: 'sold'
        },
        {
            id: 2,
            userId: 2,
            itemName: 'common butterfly',
            itemType: 'bugs',
            price: 500,
            timePosted: expect.anything(),
            timeSold: expect.anything(),
            listingType: 'bought'
        }]);
    });
    test("works: by username", async function () {
        let listings = await Listing.findAll({ username: "testuser1" });
        expect(listings).toEqual([{
            id: 1,
            userId: 1,
            itemName: 'Cyrano',
            itemType: 'villagers',
            price: 100000,
            timePosted: expect.anything(),
            timeSold: null,
            listingType: 'curr'
        },
        {
            id: 2,
            userId: 1,
            itemName: 'common butterfly',
            itemType: 'bugs',
            price: 500,
            timePosted: expect.anything(),
            timeSold: expect.anything(),
            listingType: 'sold'
        },
        {
            id: 3,
            userId: 1,
            itemName: 'bitterling',
            itemType: 'fish',
            price: 250,
            timePosted: expect.anything(),
            timeSold: null,
            listingType: 'cart'
        }]);
    });
    test("works: by maxPrice", async function () {
        let listings = await Listing.findAll({ maxPrice: 300 });
        expect(listings).toEqual([{
            id: 3,
            userId: 2,
            itemName: 'bitterling',
            itemType: 'fish',
            price: 250,
            timePosted: expect.anything(),
            timeSold: null,
            listingType: 'curr'
        },
        {
            id: 3,
            userId: 1,
            itemName: 'bitterling',
            itemType: 'fish',
            price: 250,
            timePosted: expect.anything(),
            timeSold: null,
            listingType: 'cart'
        }]);
    });
    test("works: by listingType", async function () {
        let listings = await Listing.findAll({ listingType: "cart" });
        expect(listings).toEqual([
            {
                id: 3,
                userId: 1,
                itemName: 'bitterling',
                itemType: 'fish',
                price: 250,
                timePosted: expect.anything(),
                timeSold: null,
                listingType: 'cart'
            }
        ]);
    });
});

/************************************** addToCart */
// describe("addToCart", function () {
    // test("works", async function () {

    // });
// });

/************************************** removeFromCart */
// describe("removeFromCart", function () {
//     test("works", async function () {

//     });
// });

/************************************** updateType */
// describe("updateType", function () {
//     test("works", async function () {

//     });
// });

/************************************** sell */
// describe("sell", function () {
//     test("works", async function () {

//     });
// });