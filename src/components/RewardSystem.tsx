import React from 'react';

interface RewardSystemProps {
  score: number;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ score }) => {
  const getRewardLevel = (score: number) => {
    if (score < 25) return '🥉 Bronze';
    if (score < 50) return '🥈 Silver';
    if (score < 75) return '🥇 Gold';
    return '💎 Diamond';
  };

  return (
    <div className="reward-system">
      <h3>Achievement Level</h3>
      <p>{getRewardLevel(score)}</p>
    </div>
  );
};

export default RewardSystem;