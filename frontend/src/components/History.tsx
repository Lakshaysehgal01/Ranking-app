import React from "react";
import { Clock, User, Award } from "lucide-react";

interface HistoryEntry {
  _id: string;
  userId: string;
  username: string;
  points: number;
  createdAt: string; // ✅ was Date, now string from DB
}

interface HistoryProps {
  history: HistoryEntry[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  // ✅ Convert string to Date before sorting
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span>Point History</span>
        </h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {sortedHistory.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No point claims yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedHistory.map((entry) => (
              <div
                key={entry._id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {entry.username}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatTime(entry.createdAt)} •{" "}
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      +{entry.points}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
