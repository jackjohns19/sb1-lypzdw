import React from 'react';
import { Trophy } from 'lucide-react';

interface ProgressTrackerProps {
  score: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ score }) => {
  const milestones = [5, 10, 25, 50, 100];

  const getNextMilestone = () => {
    return milestones.find((milestone) => milestone > score) || 'Max';
  };

  const getProgressPercentage = () => {
    const nextMilestone = getNextMilestone();
    if (nextMilestone === 'Max') return 100;
    const prevMilestone = milestones[milestones.indexOf(nextMilestone) - 1] || 0;
    return ((score - prevMilestone) / (nextMilestone - prevMilestone)) * 100;
  };

  return (
    <div className="mt-6 w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {score} / {getNextMilestone()}
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${getProgressPercentage()}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Next milestone: {getNextMilestone()} points
        </span>
        {score >= 100 && (
          <div className="flex items-center text-yellow-500">
            <Trophy size={24} />
            <span className="ml-2 font-semibold">Master Counter!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;