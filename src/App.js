import { useState } from "react";

import Tower from "./Tower.js";
import "./App.css";

const INITIAL_START_TOWER = [7, 6, 5, 4, 3, 2, 1];

let timers = [];

function App() {
  const [tower0, setTower0] = useState(INITIAL_START_TOWER);
  const [tower1, setTower1] = useState([]);
  const [tower2, setTower2] = useState([]);

  const towers = [tower0, tower1, tower2];

  function solveHanoi(n) {
    let moves = [];
    const _solveHanoi = (n, from, to, spare) => {
      if (n === 1) {
        const move = [from, to];
        moves.push(move);
      } else {
        _solveHanoi(n - 1, from, spare, to);
        _solveHanoi(1, from, to, spare);
        _solveHanoi(n - 1, spare, to, from);
      }
    };
    _solveHanoi(n, 0, 2, 1);

    // Timer is kept track of in order to allow user to cancel visualization
    // at any time by clearing all timers and resetting to original state.
    let timer;
    moves.forEach((move, i) => {
      timer = setTimeout(() => moveRing(move[0], move[1]), (1 + i) * 200);
      timers.push(timer);
    });
  }

  // Move a ring from one tower to another. The last element of the
  // tower's array represents the top ring on the tower.
  function moveRing(from, to) {
    if (from < 0 || from > 2 || to < 0 || to > 2 || from === to) {
      throw new Error(`Invalid rings: ${from}, ${to}`);
    }

    const movingRing = towers[from][towers[from].length - 1];
    towers[from] = towers[from].slice(0, towers[from].length - 1);
    towers[to].push(movingRing);

    updateTowersState();
  }

  function updateTowersState() {
    setTower0(towers[0]);
    setTower1(towers[1]);
    setTower2(towers[2]);
  }

  function reset() {
    for (let i = 0; i < timers.length; i++) {
      clearTimeout(timers[i]);
    }

    towers[0] = INITIAL_START_TOWER;
    towers[1] = [];
    towers[2] = [];
    updateTowersState();
  }

  return (
    <div className="App">
      <Tower rings={tower0} />
      <Tower rings={tower1} />
      <Tower rings={tower2} />
      <button onClick={() => solveHanoi(INITIAL_START_TOWER.length)}>
        Solve!
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
