const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const helper = require('../helpers/product.helper');

require('dotenv').config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Connection to Mongo established"))
        .catch(err => console.log("Failed to connect to MongoDB", err));
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("Request GET /api/products", () => {
    it("Returns all products", async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 10000);
});

describe('Request GET /api/products/:_id', () => {
    it('Returns a product', async () => {
        const result = await helper.findLastInsertedProduct();
        const res = await request(app).get('/api/products/' + result._id);
        expect(res.statusCode).toBe(200);
        expect(res.body.data._id.toString()).toBe(result._id.toString());
    }, 20000); 
});

describe('Request POST /api/products', () => {
    it('Creates a product', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                product: "Test Product",  // Corrected field name
                cost: 300,  // Ensure correct data type
                description: "Test description",
                quantity: 50  // Ensure correct data type
            });
        expect(res.statusCode).toBe(201);  // Use 201 for created resource
        expect(res.body.data).toBeTruthy();
    }, 10000);
});

describe("DELETE /api/products/:_id", () => {
    it("Delete last inserted product", async () => {
        const result = await helper.findLastInsertedProduct();
        const res = await request(app).delete('/api/products/' + result._id);
        expect(res.statusCode).toBe(200);
    }, 10000);
});
