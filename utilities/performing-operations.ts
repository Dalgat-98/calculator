export default function evaluateExpression(expression: string): string {
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
        return a / b;
      case "%":
        return a % b;
      default:
        return 0;
    }
  }

  function evaluate(tokens: string[]): number {
    const values: number[] = [];
    const ops: string[] = [];

    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        values.push(Number(token));
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
        ops.pop();
      }
    }

    while (ops.length) {
      const b = values.pop()!;
      const a = values.pop()!;
      const op = ops.pop()!;
      values.push(applyOperator(a, b, op));
    }

    return values[0];
  }

  const tokens = expression.match(/(\d+|[-+*/%()])/g);
  if (!tokens) throw new Error("Invalid expression");

  const result = evaluate(tokens);
  return result.toString();
}
