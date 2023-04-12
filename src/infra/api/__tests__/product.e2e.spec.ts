import { sequelize, app } from "../express";
import request from 'supertest';

describe("2E2 test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app).post("/product").send({
            type: "a",
            name: "Clean Code",
            price: 100
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Clean Code") 
        expect(response.body.price).toBe(100)  
    });

    it("should not create a product with invalid data", async () => {
        const response = await request(app).post("/product").send({
            name: "Clean Code"
        });
        expect(response.status).toBe(500);
    });

    it ("should list all products", async () => {
        let response = await request(app).post("/product").send({
            type: "a",
            name: "Clean Code",
            price: 100
        });
        expect(response.status).toBe(200);
        response = await request(app).post("/product").send({
            type: "a",
            name: "Clean Architecture",
            price: 200
        });
        expect(response.status).toBe(200);
        
        const listReponse = await request(app).get("/product").send();
        expect(listReponse.status).toBe(200);
        expect(listReponse.body.products.length).toBe(2);
        expect(listReponse.body.products[0].name).toBe("Clean Code") 
        expect(listReponse.body.products[1].name).toBe("Clean Architecture") 
        expect(listReponse.body.products[0].price).toBe(100)
    });
});