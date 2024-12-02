import React, { useState } from 'react';

interface ProgressTrackerProps {
  totalQuestions: number;
  correctAnswers: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ totalQuestions, correctAnswers }) => {
  const progressPercentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="progress-tracker">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p>{`${correctAnswers}/${totalQuestions} Correct`}</p>
    </div>
  );
};

export default ProgressTracker;