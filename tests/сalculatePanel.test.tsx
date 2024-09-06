import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculatePanel } from "../components/shared/calculate-panel";
import "@testing-library/jest-dom";
import useStore from "../store/store";

// Мокаем useStore
jest.mock("../../store/store");

describe("CalculatePanel", () => {
  const setMathematicalExpression = jest.fn();
  const setMathematicalResult = jest.fn();
  const setMathOperator = jest.fn();

  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      mathematicalExpression: "0",
      setMathematicalExpression,
      mathematicalResult: "0",
      setMathematicalResult,
      mathOperator: "",
      setMathOperator,
    });
  });

  test("renders with initial state", () => {
    render(<CalculatePanel />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("handles number input correctly", () => {
    render(<CalculatePanel />);
    fireEvent.click(screen.getByText("1")); // Предполагается, что кнопка "1" есть в ButtonList
    expect(setMathematicalResult).toHaveBeenCalledWith("1");
  });

  test("handles clear operation", () => {
    render(<CalculatePanel />);
    fireEvent.click(screen.getByText("C")); // Предполагается, что кнопка "C" есть в ButtonList
    expect(setMathematicalExpression).toHaveBeenCalledWith("0");
    expect(setMathematicalResult).toHaveBeenCalledWith("0");
  });

  test("handles CE operation", () => {
    render(<CalculatePanel />);
    fireEvent.click(screen.getByText("CE")); // Предполагается, что кнопка "CE" есть в ButtonList
    expect(setMathematicalResult).toHaveBeenCalledWith("0");
  });

  test("handles operator input correctly", () => {
    render(<CalculatePanel />);
    fireEvent.click(screen.getByText("+")); // Предполагается, что кнопка "+" есть в ButtonList
    expect(setMathOperator).toHaveBeenCalledWith("+");
  });

  test("handles equals operation", () => {
    const performingOperationsMock = jest.fn().mockReturnValue("5"); // Мокаем функцию performingOperations
    jest.mock(
      "../../utilities/performing-operations",
      () => performingOperationsMock
    );

    render(<CalculatePanel />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("=")); // Предполагается, что кнопка "=" есть в ButtonList

    expect(setMathematicalResult).toHaveBeenCalledWith("5");
    expect(setMathematicalExpression).toHaveBeenCalledWith(
      expect.stringContaining("=")
    );
  });

  test("handles keyboard input correctly", () => {
    render(<CalculatePanel />);
    fireEvent.keyDown(window, { key: "1" });
    expect(setMathematicalResult).toHaveBeenCalledWith("1");

    fireEvent.keyDown(window, { key: "C" });
    expect(setMathematicalExpression).toHaveBeenCalledWith("0");
    expect(setMathematicalResult).toHaveBeenCalledWith("0");
  });
});
