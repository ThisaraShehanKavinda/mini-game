import { Timer, Trophy } from 'lucide-react';
import React from 'react';

const Scoreboard = ({ score, highScore, timeLeft }) => {
  return (
    <div className="scoreboard flex justify-between items-center bg-gray-800 text-white rounded-lg p-4 shadow-lg">
      {/* Current Score */}
      <div className="flex items-center gap-2">
        <Trophy className="text-yellow-400 h-6 w-6" />
        <div>
          <p className="text-lg font-bold">Score</p>
          <p className="text-xl">{score}</p>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Timer className={`h-6 w-6 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`} />
        <div>
          <p className="text-lg font-bold">Time Left</p>
          <p className={`text-xl ${timeLeft < 10 ? 'text-red-500' : ''}`}>
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* High Score */}
      <div className="flex items-center gap-2">
        <Trophy className="text-green-400 h-6 w-6" />
        <div>
          <p className="text-lg font-bold">High Score</p>
          <p className="text-xl">{highScore}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
