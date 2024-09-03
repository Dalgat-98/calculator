import React from "react";
import { GroupButton } from "./group-button";

const listButtons = [
  "C",
  "CE",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "00",
  "0",
  ",",
  "=",
];

interface Props {
  className: string;
  handleClick: (value: string) => void;
}

export const ButtonList: React.FC<Props> = ({ className, handleClick }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-5">
      <GroupButton
        className={""}
        listOperator={listButtons}
        click={handleClick}
      />
    </div>
  );
};
