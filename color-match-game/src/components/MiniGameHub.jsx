import React from 'react';

const MiniGameHub = ({ onSelectGame }) => {
  return (
    <div className="mini-game-hub">
      <h1>Mini-Game Hub</h1>
      <p>Select a game to play!</p>
      <div className="game-buttons">
        <button onClick={() => onSelectGame('color-match')}>Color Match</button>
        <button onClick={() => onSelectGame('memory-match')}>Memory Match</button>
        <button onClick={() => onSelectGame('reaction-time')}>Reaction Time Test</button>
        <button onClick={() => onSelectGame('shape-dodge')}>Shape Dodge</button>
      </div>
    </div>
  );
};

export default MiniGameHub;
