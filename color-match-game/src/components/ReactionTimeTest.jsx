import React, { useState } from 'react';

const ReactionTimeTest = () => {
  const [targetColor, setTargetColor] = useState('');
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const colors = ['#FF4444', '#4444FF', '#44FF44', '#9944FF', '#FF8844', '#FF44FF'];

  const startGame = () => {
    setGameOver(false);
    setReactionTime(null);
    setStartTime(null);
    setTargetColor('');
    setTimeout(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setTargetColor(randomColor);
      setStartTime(Date.now());
    }, Math.floor(Math.random() * 5000)); // Random delay between 0-5 seconds
  };

  const handleClick = () => {
    if (startTime) {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setGameOver(true);
    }
  };

  return (
    <div className="reaction-time-test">
      {gameOver ? (
        <div>
          <h3>Your reaction time: {reactionTime}ms</h3>
          <button onClick={startGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <h2>Click the color as fast as you can!</h2>
          <div
            className="reaction-target"
            style={{ backgroundColor: targetColor }}
            onClick={handleClick}
          >
            Click Me!
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionTimeTest;
