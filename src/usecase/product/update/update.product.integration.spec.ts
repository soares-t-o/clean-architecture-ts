import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductModel from "../../../infra/product/repository/sequilize/product.model";
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository";

const product = new Product("1", "Product 1", 10);

describe('Update Product', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it('should update a product', async () => {
        const repository = new ProductRepository();

        await repository.create(product);
        
        const updateProduct = new UpdateProductUseCase(repository);
        
        const p = new Product("1", "Product 2223", 100);
        const output = await updateProduct.execute(p);
        
        expect(output.id).toBe(p.id);
        expect(output.name).toBe(p.name);
        expect(output.price).toBe(p.price);

        const outputFind = await repository.find("1");
        
        expect(outputFind.id).toBe(p.id);
        expect(outputFind.name).toBe(p.name);
        expect(outputFind.price).toBe(p.price);
    })
})