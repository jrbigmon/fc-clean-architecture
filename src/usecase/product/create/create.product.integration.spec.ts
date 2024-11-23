import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "./create.product.dto";

describe("Integration test create product use case", () => {
  let sequelize: Sequelize;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  beforeAll(() => {
    createProductUseCase = new CreateProductUseCase(new ProductRepository());
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be create a new product", async () => {
    const input: InputCreateProductDto = {
      name: "Product 1",
      price: 100,
    };

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      ...input,
    });
  });
});
