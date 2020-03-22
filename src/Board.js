import React from "react";

export const BOARD_SIZE = 100;

let _cell = ({ id, cell, onClick }) => {
  let owner = cell?.owner;
  const CELL_SIZE = 30;

  const cellStyle = owner => ({
    width: `${CELL_SIZE}px`,
    minWidth: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    lineHeight: `${CELL_SIZE}px`,
    maxWidth: `${CELL_SIZE}px`,
    left: `${CELL_SIZE * (id % BOARD_SIZE)}px`,
    top: `${CELL_SIZE * Math.floor(id / BOARD_SIZE)}px`,
    background: owner == null ? null : owner == 1 ? "tomato" : "steelblue" // https://www.w3schools.com/colors/colors_names.asp
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

let Cell = React.memo(
  _cell,
  (prevProps, nextProps) =>
    prevProps.id == nextProps.id &&
    JSON.stringify(prevProps.cell) == JSON.stringify(nextProps.cell)
);

class Board extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.reinforce(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  cells() {
    return this.props.G.cells;
  }
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  }

  render() {
    let winner = "";
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    return (
      <div id="container">
        <table id="board">
          <tbody>
            {Array(BOARD_SIZE)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  {Array(BOARD_SIZE)
                    .fill()
                    .map((_, j) => {
                      const id = BOARD_SIZE * i + j;
                      const cell = this.props.G.cells[id];
                      return (
                        <Cell
                          key={id}
                          cell={cell}
                          id={id}
                          onClick={this.onClick.bind(this)}
                        />
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
        {winner}
      </div>
    );
  }
}

export default Board;
