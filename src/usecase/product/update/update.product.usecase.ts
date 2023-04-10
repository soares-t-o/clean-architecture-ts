import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputProductUseCaseDto, OutputProductUseCaseDto } from "./update.product.dto";

export class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputProductUseCaseDto): Promise<OutputProductUseCaseDto> {

        const product = await this.productRepository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}