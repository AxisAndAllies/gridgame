import React from "react";
import Cell from "./Cell";

export const BOARD_SIZE = 60;

function getOwnedBy(cells, owner) {
  return cells.filter(c => c && c.owner === owner);
}

function getOccupied(cells) {
  return cells.filter(c => c);
}

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
      <React.Fragment>
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
        <div id="floatingpanel">
          <pre>
            {(() => {
              let cells = this.props.G.cells;
              let cur = this.props.ctx.currentPlayer;
              let sumStrength = cells =>
                cells.reduce((a, v) => a + v.strength, 0);
              let a = sumStrength(getOwnedBy(cells, cur));
              return JSON.stringify(
                {
                  player: a,
                  enemy: sumStrength(getOccupied(cells)) - a
                },
                undefined,
                2
              );
            })()}
          </pre>
        </div>
      </React.Fragment>
    );
  }
}

export default Board;
