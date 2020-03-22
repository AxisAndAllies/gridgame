import React from "react";

export const BOARD_SIZE = 50;

let Cell = ({ id, owner, onClick }) => {
  const CELL_SIZE = 20;

  const cellStyle = owner => ({
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    lineHeight: `${CELL_SIZE}px`,
    maxWidth: `${CELL_SIZE}px`,
    overflow: "hidden",
    textAlign: "center",
    background: owner == null ? null : owner == 1 ? "tomato" : "steelblue" // https://www.w3schools.com/colors/colors_names.asp
  });

  return (
    <td
      className="cell"
      style={cellStyle(owner)}
      key={id}
      onClick={() => onClick(id)}
    >
      {owner}
    </td>
  );
};

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

    let tbody = Array(BOARD_SIZE)
      .fill()
      .map((_, i) => (
        <tr key={i}>
          {Array(BOARD_SIZE)
            .fill()
            .map((_, j) => {
              const id = BOARD_SIZE * i + j;
              const owner = this.props.G.cells[id]?.owner;
              return (
                <Cell
                  key={id}
                  owner={owner}
                  id={id}
                  onClick={this.onClick.bind(this)}
                />
              );
            })}
        </tr>
      ));

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

export default Board;
