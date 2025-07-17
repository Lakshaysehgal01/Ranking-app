import React, { useState } from 'react';
import { Award, Loader2 } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  points: number;
}

interface ClaimButtonProps {
  selectedUser: User | null;
  onClaim: (userId: string) => void;
  lastClaimedPoints: number | null;
  isLoading: boolean;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  selectedUser,
  onClaim,
  lastClaimedPoints,
  isLoading
}) => {
  const handleClaim = () => {
    if (selectedUser) {
      onClaim(selectedUser._id);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleClaim}
        disabled={!selectedUser || isLoading}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
          !selectedUser || isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Claiming...</span>
          </>
        ) : (
          <>
            <Award className="h-5 w-5" />
            <span>Claim Points</span>
          </>
        )}
      </button>
      
      {lastClaimedPoints !== null && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Points Claimed Successfully!
            </span>
          </div>
          <p className="text-green-700 mt-1">
            {selectedUser?.name} received <span className="font-bold">{lastClaimedPoints} points</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ClaimButton;