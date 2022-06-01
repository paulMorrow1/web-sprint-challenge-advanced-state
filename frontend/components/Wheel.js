import React from "react";
import { connect } from "react-redux";
import {
  moveClockwise as _moveClockwise,
  moveCounterClockwise as _moveCounterClockwise,
} from "../state/action-creators";

function Wheel({ wheelState, moveClockwise, moveCounterClockwise }) {
  return (
    <div id="wrapper">
      <div id="wheel">
        {Array.from({ length: 6 }, (_, index) => index)?.map((num) => (
          <div
            className={`cog ${wheelState === num ? "active" : ""}`}
            style={{ "--i": num }}
            key={num}
          >
            {wheelState === num ? "B" : null}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button
          id="counterClockwiseBtn"
          onClick={() => moveCounterClockwise(wheelState)}
        >
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={moveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

export default connect((state) => ({ wheelState: state.wheel }), {
  moveClockwise: _moveClockwise,
  moveCounterClockwise: _moveCounterClockwise,
})(Wheel);
