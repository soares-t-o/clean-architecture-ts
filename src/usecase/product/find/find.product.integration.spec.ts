import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infra/product/repository/sequilize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import ProductModel from "../../../infra/product/repository/sequilize/product.model";


const product = new Product("1", "Product 1", 10.00)


describe("Unit test find product use case", () => {
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
    
    it("should find a product", async () => {
        const productRepository = new ProductRepository()
        const productFindUseCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);
        
        const input = {
            id : "1",
        }
        const output = await productFindUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price,
        });
    });

    it("should thrown an error when product not found", async () => {
        const productRepository = new ProductRepository()
        const productFindUseCase = new FindProductUseCase(productRepository);
        
        const input = {
            id : "1",
        }

        await expect(productFindUseCase.execute(input)).rejects.toThrow(
            "Product not found"
        );
    })
})