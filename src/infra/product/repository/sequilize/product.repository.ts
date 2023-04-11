import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: ProductInterface): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }
    async update(entity: ProductInterface): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        },
            {
                where: { id: entity.id }
            })
    }
    async find(id: string): Promise<ProductInterface> {
        let productModel;
        try {
            productModel = await ProductModel.findOne(
                { 
                    where: { id: id } ,
                    rejectOnEmpty: true,
                }
            );
            console.log(productModel);
        } catch (error) {
            throw new Error("Product not found");
          }
        return new Product(productModel.id, productModel.name, productModel.price)
    }
    async findAll(): Promise<ProductInterface[]> {
        const products = await ProductModel.findAll();
        return products.map(
            product => new Product(product.id, product.name, product.price)
        );
    }
}