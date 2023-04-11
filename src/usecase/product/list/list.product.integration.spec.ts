import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";
import ProductModel from "../../../infra/product/repository/sequilize/product.model";
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository";

const product_1 = new Product("1", "Product 1", 10);
const product_2 = new Product("2", "Product 2", 20);

describe('ListProduct', () => {

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
    it('should list a product', async () => {
        const repository = new ProductRepository();
        const products = new ListProductUseCase(repository);
        
        await repository.create(product_1);
        await repository.create(product_2);

        const output = await products.execute({});
        expect(output.product.length).toBe(2);
        expect(output.product[0].id).toBe(product_1.id);
        expect(output.product[0].name).toBe(product_1.name);
        expect(output.product[0].price).toBe(product_1.price);
        expect(output.product[1].id).toBe(product_2.id);
        expect(output.product[1].name).toBe(product_2.name);
        expect(output.product[1].price).toBe(product_2.price);
    })
})