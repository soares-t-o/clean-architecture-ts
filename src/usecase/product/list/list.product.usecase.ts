import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map(products => ({
                id: products.id,
                name: products.name,
                price: products.price
            }))
        }
    }
}