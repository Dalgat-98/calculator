import React from "react";
import { Button } from "../ui";

interface Props {
  className: string;
  listOperator: string[];
  click: (operator: string) => void;
}

export const GroupButton: React.FC<Props> = ({
  className,
  listOperator,
  click,
}) => {
  return (
    <>
      {listOperator.map((operator, index) => (
        <Button key={operator} operator={operator} click={click} />
      ))}
    </>
  );
};
