import React, { useState, useEffect } from 'react';
import { GameLevel, GameMode } from '../types';

interface GameBoardProps {
  level: GameLevel;
  mode: GameMode;
  onScoreChange: (newScore: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ level, mode, onScoreChange }) => {
  const [sequence, setSequence] = useState<(number | null)[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  useEffect(() => {
    generateNewSequence();
  }, [level, mode]);

  const generateNewSequence = () => {
    const step = mode === '2s' ? 2 : mode === '5s' ? 5 : 10;
    const maxNumber = level === 'easy' ? 50 : level === 'medium' ? 100 : 200;
    const start = Math.floor(Math.random() * (maxNumber / 2 / step)) * step;
    
    let newSequence = [start, start + step, start + 2 * step, start + 3 * step];
    const missingIndex = Math.floor(Math.random() * 4);
    const missingNumber = newSequence[missingIndex];
    newSequence[missingIndex] = null;
    
    setSequence(newSequence);
    setCorrectAnswer(missingNumber);
    setUserInput('');
    setFeedback('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(userInput) === correctAnswer) {
      setFeedback('Correct! Great job!');
      onScoreChange((prevScore) => prevScore + 1);
      setTimeout(() => {
        generateNewSequence();
      }, 1500);
    } else {
      setFeedback(`Oops! The correct answer was ${correctAnswer}. Try again!`);
    }
  };

  return (
    <div className="mb-4">
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">
          Fill in the missing number:
        </p>
      </div>
      <div className="flex justify-center items-center space-x-4 mb-4">
        {sequence.map((number, index) => (
          <div key={index} className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg text-2xl font-bold">
            {number === null ? '?' : number}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-2">
        <input
          type="number"
          value={userInput}
          onChange={handleInputChange}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 text-xl w-24 text-center"
          placeholder="?"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Check
        </button>
      </form>
      {feedback && (
        <p className={`text-center mt-4 text-lg ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default GameBoard;