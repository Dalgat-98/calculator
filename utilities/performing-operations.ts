export default function performingOperations(expression: string): string {
  // Заменяем запятые на точки
  expression = expression.replace(/,/g, ".");

  const operators: Set<string> = new Set(["+", "-", "*", "/", "%"]);
  const precedence: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
  };

  function applyOperator(a: number, b: number, operator: string): number {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) throw new Error("Деление на ноль");
        return a / b;
      case "%":
        return a % b;
      default:
        throw new Error("Неизвестный оператор");
    }
  }

  function evaluate(tokens: string[]): number {
    const values: number[] = [];
    const ops: string[] = [];

    for (const token of tokens) {
      if (!isNaN(Number(token)) || token.includes(".")) {
        values.push(parseFloat(token));
      } else if (operators.has(token)) {
        while (
          ops.length &&
          precedence[ops[ops.length - 1]] >= precedence[token]
        ) {
          const b = values.pop()!;
          const a = values.pop()!;
          const op = ops.pop()!;
          values.push(applyOperator(a, b, op));
        }
        ops.push(token);
      } else if (token === "(") {
        ops.push(token);
      } else if (token === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") {
          const b = values.pop()!;
          const a = values.pop()!;
          const op = ops.pop()!;
          values.push(applyOperator(a, b, op));
        }
        ops.pop(); // Удаляем '('
      }
    }

    while (ops.length) {
      const b = values.pop();
      const a = values.pop();
      const op = ops.pop();
      if (b === undefined || a === undefined || op === undefined) {
        throw new Error("Некорректное выражение");
      }
      values.push(applyOperator(a, b, op));
    }

    if (values.length !== 1) {
      throw new Error("Некорректное выражение");
    }

    return values[0];
  }

  const tokens = expression.match(/(\d+(\.\d+)?|[-+*/%()])/g);
  if (!tokens) throw new Error("Некорректное выражение");

  const result = evaluate(tokens);
  return result.toString();
}
