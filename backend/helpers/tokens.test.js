//test for tokens helper

const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

//iat: time the JWT was issued

describe("createToken", function () {
    test("creates JWT for users", function () {
        const token = createToken({ username: "test" });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test"
        });
    });
});