import React from 'react';
import GameBoard from './components/GameBoard';
import './styles/ColorMatchGame.css';

const App = () => {
  return (
    <div className="app-container">
      <GameBoard />
    </div>
  );
};

export default App;
