import React from "react";

interface Props {
  operator: string;
  click: (operator: string) => void;
}

export const Button: React.FC<Props> = ({ operator, click }) => {
  return (
    <button
      onClick={() => click(operator)}
      className="h-20 w-20 flex items-center justify-center text-4xl font-medium text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-[0.12] rounded-[100%]"
    >
      {operator}
    </button>
  );
};
