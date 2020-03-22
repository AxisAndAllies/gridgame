import React from "react";

export const BOARD_SIZE = 90;

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

    let tbody = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      let cells = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        const id = BOARD_SIZE * i + j;

        const owner = this.props.G.cells[id]?.owner;

        cells.push(
          <td
            className="cell"
            style={cellStyle(owner)}
            key={id}
            onClick={() => this.onClick(id)}
          >
            {owner}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

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
