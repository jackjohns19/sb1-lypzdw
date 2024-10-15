import React, { useState, useEffect } from 'react';
import { Star, Volume2, VolumeX } from 'lucide-react';
import GameBoard from './components/GameBoard';
import ProgressTracker from './components/ProgressTracker';
import Instructions from './components/Instructions';
import { GameLevel, GameMode } from './types';

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<GameLevel>('easy');
  const [mode, setMode] = useState<GameMode>('2s');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Load sound effects
    const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    const incorrectSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');

    // Play sound effects based on score changes
    if (score > 0) {
      if (soundEnabled) {
        correctSound.play();
      }
    }
  }, [score, soundEnabled]);

  const handleLevelChange = (newLevel: GameLevel) => {
    setLevel(newLevel);
  };

  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Count with Fun!</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
        <Instructions />
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleModeChange('2s')}
              className={`px-3 py-1 rounded ${
                mode === '2s' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Count by 2s
            </button>
            <button
              onClick={() => handleModeChange('5s')}
              className={`px-3 py-1 rounded ${
                mode === '5s' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Count by 5s
            </button>
            <button
              onClick={() => handleModeChange('10s')}
              className={`px-3 py-1 rounded ${
                mode === '10s' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Count by 10s
            </button>
          </div>
          <button onClick={toggleSound} className="text-gray-600">
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>
        <GameBoard
          level={level}
          mode={mode}
          onScoreChange={setScore}
        />
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">Difficulty:</span>
            <select
              value={level}
              onChange={(e) => handleLevelChange(e.target.value as GameLevel)}
              className="border rounded px-2 py-1"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Score:</span>
            <div className="flex items-center">
              {score} <Star className="ml-1 text-yellow-400" size={20} />
            </div>
          </div>
        </div>
      </div>
      <ProgressTracker score={score} />
    </div>
  );
}

export default App;