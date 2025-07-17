import React from 'react';
import { ChevronDown, User } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  points: number;
}

interface UserSelectorProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  onSelectUser,
  isOpen,
  onToggle
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-gray-900">
              {selectedUser ? selectedUser.name : 'Select a user'}
            </span>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => onSelectUser(user)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {user.points} pts
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSelector;