import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100.0,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should be create a new product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  it("should not create a product when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    await expect(
      createProductUseCase.execute({ ...input, name: null })
    ).rejects.toThrow("Name is required");
  });

  it("should not create a product when price is wrong", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    await Promise.all([
      expect(
        createProductUseCase.execute({ ...input, price: null })
      ).rejects.toThrow("Price must be greater than zero"),

      expect(
        createProductUseCase.execute({ ...input, price: -1 })
      ).rejects.toThrow("Price must be greater than zero"),

      expect(
        createProductUseCase.execute({ ...input, price: undefined })
      ).rejects.toThrow("Price must be greater than zero"),
    ]);
  });
});
