const db = require("../db.js");
const { BadRequestError } = require("../expressError.js");
const Item = require("./item.js")

beforeAll(
    async function () {
        //reset items table in db
        await db.query("DELETE FROM items");

        await db.query(`
        INSERT INTO items(file_name, type, name)
        VALUES ('bitterling', 'fish', 'bitterling'),
               ('ant00', 'villagers', 'Cyrano')`);
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

describe("add", function () {
    test("adds item to db", async function () {
        const item = await Item.add("amber", "fossils");
        expect(item).toEqual({
            fileName: "amber",
            type: "fossils",
            name: "amber"
        });
    });

    test("raises error for invalid item", async function () {
        try { await Item.add("invalid", "invalid"); }
        catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });
});

describe("check", function () {
    test("works for item in db", async function () {
        const item = await Item.check("bitterling");
        expect(item).toEqual({
            fileName: "bitterling",
            type: "fish",
            name: "bitterling"
        });
    })
})