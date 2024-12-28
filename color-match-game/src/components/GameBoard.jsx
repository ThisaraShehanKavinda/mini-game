import { AlertCircle, Timer, Trophy } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './Alert';

const Confetti = lazy(() => import('react-confetti'));

const GameBoard = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => JSON.parse(localStorage.getItem('highScore')) || 0);

  const colors = [
    { name: 'Red', hex: '#FF4444' },
    { name: 'Blue', hex: '#4444FF' },
    { name: 'Green', hex: '#44FF44' },
    { name: 'Purple', hex: '#9944FF' },
    { name: 'Orange', hex: '#FF8844' },
    { name: 'Pink', hex: '#FF44FF' },
  ];

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameOver(false);
    generateNewRound();
  };

  const generateNewRound = () => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    const newTarget = shuffled[0];
    const optionsArray = shuffled.slice(0, 4);

    setTargetColor(newTarget);
    setOptions(optionsArray);
  };

  const handleColorClick = (color) => {
    if (!gameActive) return;

    if (color.hex === targetColor.hex) {
      setScore((prev) => prev + 1);
      generateNewRound();
    } else {
      setTimeLeft((prev) => Math.max(0, prev - 2));
    }
  };

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          setGameOver(true);
          setHighScore((current) => {
            const newHighScore = Math.max(current, score);
            localStorage.setItem('highScore', JSON.stringify(newHighScore));
            return newHighScore;
          });
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score]);

  return (
    <div className="game-board">
      <Suspense fallback={<div>Loading...</div>}>
        {gameOver && <Confetti />}
      </Suspense>
      <div className="header">
        <h1>Color Match</h1>
        <p>Match the color name with the correct block!</p>
      </div>

      {!gameActive && !gameOver && (
        <Alert>
          <AlertCircle />
          <AlertTitle>How to Play</AlertTitle>
          <AlertDescription>
            Match the color name with the correct block. Score points for correct matches, but wrong answers reduce time!
          </AlertDescription>
        </Alert>
      )}

      <div className="scoreboard">
        <div className="trophy">
          <Trophy />
          <span>Score: {score}</span>
        </div>
        <div className={`timer ${timeLeft < 10 ? 'low-time' : ''}`}>
          <Timer />
          <span>Time: {timeLeft}s</span>
        </div>
      </div>

      {gameActive && (
        <div className="game-area">
          <h2>Find: {targetColor.name}</h2>
          <div className="color-options">
            {options.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorClick(color)}
                style={{ backgroundColor: color.hex }}
                className="color-block"
              />
            ))}
          </div>
        </div>
      )}

      {(gameOver || !gameActive) && (
        <div className="game-over">
          {gameOver && (
            <div>
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <p>High Score: {highScore}</p>
            </div>
          )}
          <button onClick={startGame} className="start-button">
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
