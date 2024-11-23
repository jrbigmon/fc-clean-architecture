import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { UseCaseInterface } from "../../usecase.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase implements UseCaseInterface {
  constructor(private readonly ProductRepository: ProductRepositoryInterface) {}

  execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    throw new Error("Method not implemented.");
  }
}
