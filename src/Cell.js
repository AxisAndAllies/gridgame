import React from "react";

import { BOARD_SIZE } from "./Board.js";

let _cell = ({ id, cell, onClick }) => {
  let owner = cell?.owner;
  const CELL_SIZE = 30;

  let opacity = 0.5;
  if (cell) {
    let s = cell.strength;
    opacity = Math.max(0.1, Math.log2(s - 10) / 12);
    // console.log(opacity);
  }

  const cellStyle = owner => ({
    width: `${CELL_SIZE}px`,
    minWidth: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    lineHeight: `${CELL_SIZE}px`,
    maxWidth: `${CELL_SIZE}px`,
    left: `${CELL_SIZE * (id % BOARD_SIZE)}px`,
    top: `${CELL_SIZE * Math.floor(id / BOARD_SIZE)}px`,
    // opacity: `${opacity}`,
    background:
      owner == null
        ? null
        : owner == 1
        ? `rgba(255, 99, 71, ${opacity})`
        : `rgba(70,130,180 ,${opacity} )` // https://www.w3schools.com/colors/colors_names.asp
  });
  // console.log(CELL_SIZE * (id % BOARD_SIZE), (CELL_SIZE * id) / BOARD_SIZE);

  return (
    <td
      className="cell"
      style={cellStyle(owner)}
      key={id}
      onClick={() => onClick(id)}
    >
      {cell?.strength}
    </td>
  );
};

const Cell = React.memo(
  _cell,
  (prevProps, nextProps) =>
    prevProps.id == nextProps.id &&
    JSON.stringify(prevProps.cell) == JSON.stringify(nextProps.cell)
);

export default Cell;
