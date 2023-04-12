import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";

const product_1 = new Product("1", "Product 1", 10);
const product_2 = new Product("2", "Product 2", 20);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product_1,product_2])),
        create: jest.fn(),
        update: jest.fn(),
    };
}
describe('ListProduct', () => {
    it('should list a product', async () => {
        const repository = MockRepository();
        const products = new ListProductUseCase(repository);
        const output = await products.execute({});
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product_1.id);
        expect(output.products[0].name).toBe(product_1.name);
        expect(output.products[0].price).toBe(product_1.price);
        expect(output.products[1].id).toBe(product_2.id);
        expect(output.products[1].name).toBe(product_2.name);
        expect(output.products[1].price).toBe(product_2.price);
    })
})