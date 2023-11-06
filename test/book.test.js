/**
 * Module dependencies
 */

const request = require('supertest');
let app = require('../index')
const express = require('express');

const expect = require('chai').expect;

/**
 * Globals
 */
let agent,
    book;

/**
 * Plan routes tests
 */
describe('Book test cases', () => {
    before(async () => {
        // Get application
        app =  express();
        agent =  request.agent(app);
    });

    beforeEach(async () => {
        book = {
            "name":"Half GF",
            "author":"Chetan Bhagat",
            "price":450,
            "publishedDate":"2020-01-01"
        };

    });

    it('should be able to create book', async () => {
        const result = await agent
            .post('/book')
            .send(book)
            .expect(200);
        expect(result).to.not.be.empty;
    });
    it('should be able to update book', async () => {
        const result = await agent
            .put('/book/65488aa24dec5a6a64acfbfa')
            .send(book)
            .expect(200);
        expect(result).to.not.be.empty;
    });
    it('should be able to delete book', async () => {
        const result = await agent
            .delete('/book/65488aa24dec5a6a64acfbfa')
            .send(book)
            .expect(200);
        expect(result).to.not.be.empty;
    });

    it('should be able to get a book', async () => {
        const result = await agent
            .get('/book/65488aa24dec5a6a64acfbfa')
            .send(book)
            .expect(200);
        expect(result).to.not.be.empty;
    });
    it('should be able to get book list', async () => {
        const result = await agent
            .get('/book')
            .send(book)
            .expect(200);
        expect(result).to.not.be.empty;
    });

    afterEach(async () => {
    });
});
