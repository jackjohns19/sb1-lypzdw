import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

const Instructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 text-blue-600 hover:text-blue-700"
      >
        <HelpCircle size={24} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">How to Play</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose a counting mode: 2s, 5s, or 10s.</li>
              <li>Select a difficulty level: Easy, Medium, or Hard.</li>
              <li>Look at the sequence of numbers displayed.</li>
              <li>Identify the missing number in the sequence.</li>
              <li>Type the missing number in the input box.</li>
              <li>Click the "Check" button to submit your answer.</li>
              <li>If correct, you'll earn a point and move to the next sequence!</li>
              <li>Keep playing to reach milestones and become a Master Counter!</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              Remember, you're counting by 2s, 5s, or 10s depending on the mode you've chosen. Have fun and happy counting!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Instructions;