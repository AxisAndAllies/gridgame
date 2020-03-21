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

const Main = {
  setup: () => ({ cells: Array(BOARD_SIZE * BOARD_SIZE).fill(null) }),

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
      }
    }
  },

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
