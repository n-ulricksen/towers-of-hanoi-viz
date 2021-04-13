import { useState } from "react";

import Tower from "./Tower.js";
import "./App.css";

const DEFAULT_RING_COUNT = 3;
const MIN_RING_COUNT = 2;
const MAX_RING_COUNT = 9;

const DEFAULT_SPEED = 5;
const MIN_SPEED = 1;
const MAX_SPEED = 10;

let timers = [];

function App() {
  const [ringCount, setRingCount] = useState(DEFAULT_RING_COUNT);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [tower0, setTower0] = useState(generateStartRings(ringCount));
  const [tower1, setTower1] = useState([]);
  const [tower2, setTower2] = useState([]);

  const towers = [tower0, tower1, tower2];

  // Calculate moves required to solve Towers of Hanoi puzzle, and then
  // apply the moves to the Ring components.
  function solveHanoi(n) {
    let moves = [];
    const _solveHanoi = (n, from, to, spare) => {
      if (n < 1) {
        return;
      }
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
      timer = setTimeout(
        () => moveRing(move[0], move[1]),
        (1 + i) * (100 + 1000 / speed)
      );
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

  function generateStartRings(n) {
    let ret = [];
    for (let i = n; i > 0; i--) {
      ret.push(i);
    }
    return ret;
  }

  function reset() {
    resetInputs();
    resetTowers();
  }

  function resetTowers() {
    for (let i = 0; i < timers.length; i++) {
      clearTimeout(timers[i]);
    }

    towers[0] = generateStartRings(ringCount);
    towers[1] = [];
    towers[2] = [];
    updateTowersState();
  }

  function resetInputs() {
    setRingCount(DEFAULT_RING_COUNT);
    setSpeed(DEFAULT_SPEED);
  }

  function onRingCountChange(e) {
    setRingCount(e.target.value);
    resetTowers();
  }

  function onSpeedChange(e) {
    setSpeed(e.target.value);
    resetTowers();
  }

  return (
    <div className="App">
      <div className="background">
        <h2 className="title">Towers of Hanoi</h2>
        <div className="tower-container">
          <Tower rings={tower0} />
          <Tower rings={tower1} />
          <Tower rings={tower2} />
          <div className="controls">
            <div className="number-controls">
              Number of rings:{" "}
              <input
                className="number-input"
                type="number"
                min={MIN_RING_COUNT}
                max={MAX_RING_COUNT}
                value={ringCount}
                onChange={onRingCountChange}
                onBlur={onRingCountChange}
                onClick={onRingCountChange}
              />
              <br />
              Speed:{" "}
              <input
                className="number-input"
                type="range"
                min={MIN_SPEED}
                max={MAX_SPEED}
                value={speed}
                onChange={onSpeedChange}
                onBlur={onSpeedChange}
                onClick={onSpeedChange}
              />
            </div>
            <hr />
            <div className="buttons">
              <button onClick={() => solveHanoi(tower0.length)}>Solve!</button>
              <button onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
