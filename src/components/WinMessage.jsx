
import React from 'react';
export const WinMessage = ({ moves, score, onReset }) => {
  return (
    <div className="win-message">
      <h2>🎉Ewwww😏😏You Win! 🎉</h2>
      <p>Finished in {moves} Moves!!</p>
    </div>
  );
}