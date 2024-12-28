import React, { useCallback, useEffect, useState } from 'react';

const MemoryMatchGame = () => {
  const colors = ['#FF4444', '#4444FF', '#44FF44', '#9944FF', '#FF8844', '#FF44FF'];
  
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  
  const initializeGame = useCallback(() => {
    const shuffledCards = [...colors, ...colors]
      .map((value) => ({
        value,
        id: Math.random(),
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsChecking(false);
  }, [colors]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
  
  const handleCardClick = (index) => {
    if (
      isChecking ||
      flippedCards.includes(index) ||
      matchedPairs.includes(index)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      
      const [firstIndex, secondIndex] = newFlippedCards;
      
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedPairs(prev => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const isGameOver = matchedPairs.length === cards.length;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Memory Match Game</h2>
        <p className="text-gray-600">Moves: {moves}</p>
      </div>
      
      {isGameOver ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Congratulations! You Won in {moves} moves!</h3>
          <button
            onClick={initializeGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`
                aspect-square cursor-pointer transition-all duration-300 transform
                ${flippedCards.includes(index) || matchedPairs.includes(index) ? 'rotate-y-180' : ''}
                border border-gray-300 rounded-lg
                ${flippedCards.includes(index) || matchedPairs.includes(index) ? '' : 'bg-gray-200'}
              `}
              style={{
                backgroundColor: 
                  flippedCards.includes(index) || matchedPairs.includes(index)
                    ? card.value
                    : '#e2e8f0',
                height: '120px', // Fixed height for the card
                width: '120px', // Fixed width for the card
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryMatchGame;
