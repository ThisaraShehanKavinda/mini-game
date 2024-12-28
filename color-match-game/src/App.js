import React, { useState } from 'react';
import GameBoard from './components/GameBoard.jsx';
import MemoryMatchGame from './components/MemoryMatchGame.jsx';
import MiniGameHub from './components/MiniGameHub';
import ReactionTimeTest from './components/ReactionTimeTest';
import ShapeDodgeGame from './components/ShapeDodgeGame';

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'color-match':
        return <GameBoard />;
      case 'memory-match':
        return <MemoryMatchGame />;
      case 'reaction-time':
        return <ReactionTimeTest />;
      case 'shape-dodge':
        return <ShapeDodgeGame />;
      default:
        return <MiniGameHub onSelectGame={setSelectedGame} />;
    }
  };

  return <div className="app">{renderGame()}</div>;
};

export default App;
