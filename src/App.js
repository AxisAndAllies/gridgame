import { Client } from "boardgame.io/react";
import Board, { BOARD_SIZE } from "./Board";

import "./App.css";

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  // ...
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}

function getSurrounding(cells, i, j) {
  let id = BOARD_SIZE * i + j;
  let res = [];
  if (j < BOARD_SIZE - 1) res.push(id + 1);
  if (j > 0) res.push(id - 1);
  if (i > 0) res.push(id - i);
  if (i < BOARD_SIZE - 1) res.push(id + i);
  console.log(i, j, res);
  return res;
  // return [id - 1, id + 1, id - i, id + i];
}

function tickCells(cells) {
  if (cells) cells.filter(c => c && c.owner).map(c => (c.strength += 1));
  return cells;
}

const Main = {
  setup: () => ({ cells: Array(BOARD_SIZE * BOARD_SIZE).fill(null) }),

  moves: {
    attack: (G, ctx, id) => {
      if (G.cells[id] === null) {
        G.cells[id] = {
          ...G.cells[id],
          owner: ctx.currentPlayer
        };
      }
      // G.endStage();
    },
    reinforce: (G, ctx, id) => {
      if (G.cells[id] === null) {
        G.cells[id] = {
          ...G.cells[id],
          owner: ctx.currentPlayer,
          strength: 10
        };
      }
      G.cells = tickCells(G.cells, id / BOARD_SIZE);
      getSurrounding(G.cells);
      // G.endStage();
    }
  },

  // turn: {
  //   stages: {
  //     reinforce: {
  //       moves: {
  //         reinforce: (G, ctx, id) => {
  //           if (G.cells[id] === null) {
  //             G.cells[id] = {
  //               owner: ctx.currentPlayer
  //             };
  //           }
  //           G.endStage();
  //         }
  //       },
  //       next: "attack"
  //     },
  //     attack: {
  //       moves: {
  //         attack: (G, ctx, id) => {
  //           if (G.cells[id] === null) {
  //             G.cells[id] = {
  //               owner: ctx.currentPlayer
  //             };
  //           }
  //           G.endStage();
  //         }
  //       }
  //     }
  //   }
  // },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  }
};

const App = Client({ game: Main, board: Board });

export default App;
