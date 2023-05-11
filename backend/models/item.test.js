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
        ('carp', 'fish', 'carp'),
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

describe("check", function () {
    test("works for item in db", async function () {
        const item = await Item.check("bitterling");
        expect(item).toEqual({
            id: expect.any(Number),
            fileName: "bitterling",
            type: "fish",
            name: "bitterling"
        });
    })
})

describe("getByName", function () {
    test("works", async function () {
        const item = await Item.getByName("bitterling");
        const villager = await Item.getByName("cyrano");
        expect(item).toEqual({
            id: expect.any(Number),
            fileName: "bitterling",
            type: "fish",
            name: "bitterling"
        });
        expect(villager).toEqual({
            id: expect.any(Number),
            fileName: "ant00",
            type: "villagers",
            name: "Cyrano"
        });
    });
})

describe("getAllByType", function () {
    test("works", async function () {
        const items = await Item.getAllByType("fish");
        expect(items).toEqual([{
            id: expect.any(Number),
            fileName: "bitterling",
            type: "fish",
            name: "bitterling"
        },
        {
            id: expect.any(Number),
            fileName: "carp",
            type: "fish",
            name: "carp"
        }]);

    });
})

