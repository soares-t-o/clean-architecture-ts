import Product from "./product";

describe("Product unit tests", () => {
  
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Product("", "Product 1", 100);
    }).toThrowError("productA: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("productA: Name is required");
  });

  it("should throw error when price is less than zero and name is empty", () => {
    expect(() => {
      const product = new Product("123", "", -1);
    }).toThrowError("productA: Name is required,productA: Price must be greater than zero");
  });

  it("should throw error when price is less than zero, name and id is empty", () => {
    expect(() => {
      const product = new Product("", "Name", -1);
    }).toThrowError("productA: Id is required,productA: Price must be greater than zero");
  });
  
  it("should throw error when price is less than zero, name and id is empty", () => {
    expect(() => {
      const product = new Product("", "", 10);
    }).toThrowError("productA: Id is required,productA: Name is required");
  });
  it("should throw error when price is less than zero, name and id is empty", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrowError("productA: Id is required,productA: Name is required,productA: Price must be greater than zero");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("productA: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
