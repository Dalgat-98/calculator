"use client";

import React, { useEffect } from "react";
import { ButtonList } from "../shared/button-list";
import useStore from "../../store/store";
import performingOperations from "../../utilities/performing-operations";

let listMathOperator = ["+", "-", "*", "/", "%", "=", ""];

export const CalculatePanel: React.FC = () => {
  const {
    mathematicalExpression,
    setMathematicalExpression,
    mathematicalResult,
    setMathematicalResult,
    mathOperator,
    setMathOperator,
  } = useStore();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClick("CE");
    }
    handleClick(event.key);
  };

  const handleClick = (value: string) => {
    if (/^(?:[0-9]|00|,)$/.test(value)) {
      if (!mathematicalResult.includes(",") || value !== ",") {
        if (value !== "," && mathematicalResult === "0") {
          setMathematicalResult(value);
        } else setMathematicalResult(mathematicalResult + value);
      }
    }

    if (value === "C") {
      setMathematicalExpression("0");
      setMathematicalResult("0");
    }

    if (value === "CE") {
      setMathematicalResult("0");
    }

    if (listMathOperator.includes(value) && value !== "=") {
      if (mathematicalExpression.slice(-1) === "=") {
        setMathematicalExpression(mathematicalExpression.slice(0, -1) + value);
        setMathOperator(value);
        setMathematicalResult("0");
      } else {
        if (
          mathematicalResult === "0" &&
          value !== mathematicalExpression.slice(-1) &&
          mathematicalExpression.length > 1
        ) {
          setMathematicalExpression(
            mathematicalExpression.slice(0, -1) + value
          );
          setMathOperator(value);
        } else {
          setMathOperator(value);

          let res = "";
          if (mathematicalResult.slice(-1) === ",") {
            res = mathematicalResult.slice(0, -1);
          } else {
            res = mathematicalResult;
          }

          if (mathematicalExpression === "0") {
            setMathematicalExpression(res + value);
          } else {
            setMathematicalExpression(mathematicalExpression + res + value);
          }

          setMathematicalResult("0");
        }
      }
    }

    if (value === "=") {
      let res = mathematicalExpression + mathematicalResult;
      setMathematicalExpression(res + "=");
      setMathematicalResult(
        performingOperations(mathematicalExpression + mathematicalResult) + ""
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [mathematicalResult, mathematicalExpression, mathOperator]);

  return (
    <section className="flex flex-col justify-around h-[800px] w-[554px] px-12 rounded-3xl bg-blue-600 ">
      <div className="flex flex-row-reverse flex-wrap pt-20 px-10 overflow-hidden text-2xl text-white ">
        {mathematicalExpression}
      </div>
      <div className="flex flex-row-reverse pt-20 px-10 overflow-hidden pb-10 text-6xl text-white border-b-[1px]">
        {mathematicalResult}
      </div>
      <ButtonList handleClick={handleClick} className={""} />
    </section>
  );
};
