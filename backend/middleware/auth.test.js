"use strict";

//test for auth middleware

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require("./auth");

//check JWT via key from config
const { SECRET_KEY } = require("../config");
const goodJwt = jwt.sign({ username: "goodtest" }, SECRET_KEY);
const badJwt = jwt.sign({ username: "badtest" }, "badkey");

describe("authenticateJWT", function () {
    test("works with valid key", function () {
        //expect.assertions will verify that all parts of an async func run
        expect.assertions(2);
        //token is passed in the header
        const req = { headers: { authorization: `Bearer ${goodJwt}` } };
        const res = { locals: {} };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        authenticateJWT(req, res, next);
        expect(res.locals).toEqual({
            user: {
                iat: expect.any(Number),
                username: "goodtest"
            }
        });
    });

    test("works with invalid key", function () {
        expect.assertions(2);
        const req = { headers: { authorization: `Bearer ${badJwt}` } };
        const res = { locals: {} };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        authenticateJWT(req, res, next);
        //nothing is stored in res.locals since an invalid key was used
        expect(res.locals).toEqual({});
    });

    test("works with no header", function () {
        expect.assertions(2);
        const req = {};
        const res = { locals: {} };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        authenticateJWT(req, res, next);
        expect(res.locals).toEqual({});
    });
});

describe("ensureLoggedIn", function () {
    test("checks for a logged in user", function () {
        expect.assertions(1);
        const req = {};
        const res = { locals: { user: { username: "goodtest" } } };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        ensureLoggedIn(req, res, next);
    });
    test("unauth if user not logged in", function () {
        expect.assertions(1);
        const req = {};
        const res = { locals: {} };
        const next = function (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        };
        ensureLoggedIn(req, res, next);
    });
});

describe("ensureCorrectUser", function () {
    test("works with matching usernames", function () {
        expect.assertions(1);
        const req = { params: { username: "test" } };
        const res = { locals: { user: { username: "test" } } };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        ensureCorrectUser(req, res, next);
    });

    test("raises error with wrong usernames", function () {
        expect.assertions(1);
        const req = { params: { username: "wrong" } };
        const res = { locals: { user: { username: "test" } } };
        const next = function (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        };
        ensureCorrectUser(req, res, next);
    });

    test("raises error with non-logged in user", function () {
        expect.assertions(1);
        const req = { params: { username: "test" } };
        const res = { locals: {} };
        const next = function (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        };
        ensureCorrectUser(req, res, next);
    });
});
