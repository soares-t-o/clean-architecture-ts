import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = new Product("1", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe('Update Product', () => {
    it('should update a product', async () => {
        const repository = MockRepository();
        const updateProduct = new UpdateProductUseCase(repository);
        
        const p = new Product("1", "Product 2", 100);
        const output = await updateProduct.execute(p);
        
        expect(output.id).toBe(p.id);
        expect(output.name).toBe(p.name);
        expect(output.price).toBe(p.price);
    })
})