import { app, sequelize } from '../express';
import request from 'supertest';
describe("2E2 test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Anytown",
                number: 123,
                zip: "12345",
            }
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe") 
        expect(response.body.address.street).toBe("123 Main St")  
    });

    it("should not create a customer with invalid data", async () => {
        const response = await request(app).post("/customer").send({
            name: "John Doe"
        });
        expect(response.status).toBe(500);
    });

    it("should list all a customer", async () => {
        await request(app).post("/customer").send({
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Anytown",
                number: 123,
                zip: "12345",
            }
        });
        await request(app).post("/customer").send({
            name: "Mary Doe",
            address: {
                street: "123 Main St",
                city: "Anytown",
                number: 123,
                zip: "12345",
            }
        });
        const listReponse = await request(app).get("/customer").send();
        expect(listReponse.status).toBe(200);
        expect(listReponse.body.customers.length).toBe(2);
        expect(listReponse.body.customers[0].name).toBe("John Doe") 
        expect(listReponse.body.customers[1].name).toBe("Mary Doe") 
        expect(listReponse.body.customers[0].address.street).toBe("123 Main St")
    });
})