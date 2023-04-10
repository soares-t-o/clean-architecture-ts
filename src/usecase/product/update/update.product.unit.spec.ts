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
        const output = await updateProduct.execute(product);
        expect(output.id).toBe(product.id);
        expect(output.name).toBe(product.name);
        expect(output.price).toBe(product.price);
    })
})