import React, { useEffect, useState } from 'react';

const ShapeDodgeGame = () => {
  const [shapes, setShapes] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(50); // Position as a percentage (0-100)
  const [score, setScore] = useState(0);

  // Spawn new shapes every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newShape = {
        left: Math.random() * 100, // Random horizontal position
        top: 0, // Start at the top of the screen
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
    }, 1000); // Spawn a new shape every second

    return () => clearInterval(interval);
  }, []);

  // Move shapes down the screen and check for collisions
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) => {
        const updatedShapes = prevShapes
          .map((shape) => ({
            ...shape,
            top: shape.top + 5, // Move shapes down
          }))
          .filter((shape) => shape.top < 100); // Remove shapes that have gone off-screen

        // Collision detection logic
        updatedShapes.forEach((shape) => {
          if (
            shape.top >= 90 && // If the shape has reached near the bottom of the screen
            Math.abs(shape.left - playerPosition) < 10 // If the shape is close enough to the player
          ) {
            alert('Game Over!');
            setScore(0); // Reset score
            setShapes([]); // Clear shapes
          }
        });

        return updatedShapes;
      });
    }, 50); // Update every 50ms

    return () => clearInterval(interval);
  }, [playerPosition]); // Only depend on player position to avoid unnecessary re-renders

  // Handle player movement
  const handleMove = (e) => {
    const newPosition = (e.clientX / window.innerWidth) * 100;
    setPlayerPosition(newPosition);
  };

  return (
    <div className="shape-dodge-game" onMouseMove={handleMove}>
      <div className="player" style={{ left: `${playerPosition}%` }} />
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="shape"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
          }}
        />
      ))}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default ShapeDodgeGame;
