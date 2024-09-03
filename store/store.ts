import { create } from "zustand";

const listMathOperator = ["+", "-", "*", "/", "%", "=", ""];
type typeMathOperator = (typeof listMathOperator)[number];

type Store = {
  mathematicalExpression: string;
  setMathematicalExpression: (expression: string) => void;

  mathematicalResult: string;
  setMathematicalResult: (result: string) => void;

  mathOperator: typeMathOperator | null;
  setMathOperator: (value: typeMathOperator) => void;
};

const useStore = create<Store>((set) => ({
  mathematicalExpression: "0",
  setMathematicalExpression: (expression) =>
    set(() => ({ mathematicalExpression: expression })),

  mathematicalResult: "0",
  setMathematicalResult: (result) =>
    set(() => ({ mathematicalResult: result })),

  mathOperator: "",
  setMathOperator: (value) => set(() => ({ mathOperator: value })),
}));

export default useStore;
