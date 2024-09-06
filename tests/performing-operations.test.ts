import performingOperations from "../utilities/performing-operations";
describe("performingOperations", () => {
  it("должен правильно вычислять простое сложение", () => {
    expect(performingOperations("1 + 2")).toBe("3");
  });

  it("должен правильно вычислять вычитание", () => {
    expect(performingOperations("5 - 2")).toBe("3");
  });

  it("должен правильно вычислять умножение", () => {
    expect(performingOperations("3 * 4")).toBe("12");
  });

  it("должен правильно вычислять деление", () => {
    expect(performingOperations("10 / 2")).toBe("5");
  });

  it("должен правильно вычислять остаток от деления", () => {
    expect(performingOperations("10 % 3")).toBe("1");
  });

  it("должен обрабатывать несколько операций", () => {
    expect(performingOperations("1 + 2 * 3")).toBe("7"); // 2 * 3 = 6; 1 + 6 = 7
    expect(performingOperations("(1 + 2) * 3")).toBe("9"); // (1 + 2) = 3; 3 * 3 = 9
  });

  it("должен выбрасывать ошибку для некорректных выражений", () => {
    expect(() => performingOperations("1 + ")).toThrow(
      "Некорректное выражение"
    );
    expect(() => performingOperations("abc")).toThrow("Некорректное выражение");
  });
});
