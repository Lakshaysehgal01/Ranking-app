import React, { useEffect, useState } from "react";
import { Award, Users, TrendingUp, Loader } from "lucide-react";
import UserSelector from "./components/UserSelector";
import AddUser from "./components/AddUser";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import History from "./components/History";
import type { User, HistoryEntry } from "./utils/mockData";
import axios from "axios";
import { Toaster } from "sonner";

function App() {
  const [users, setUsers] = useState<User[]>([]); // give user from get all users
  const [loader, setLoader] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState<number | null>(
    null
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const getUsers = async () => {
    setLoader(true);
    try {
      const users = await axios.get("http://localhost:8080/api/v1/getalluser");
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const getHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/history");
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  useEffect(() => {
    getUsers();
    getHistory();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDropdownOpen(false);
    setLastClaimedPoints(null);
  };

  const handleClaim = async (userId: string) => {
    setIsLoading(true);

    // Simulate API call delay
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // post claim call here
    const res = await axios.post("http://localhost:8080/api/v1/claim", {
      userId,
    });
    console.log(res.data);
    const points = res.data?.points;
    // const points = generateRandomPoints();

    // Update user points
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, points: user.points + points } : user
      )
    );

    // Update selected user
    const updatedUser = users.find((user) => user._id === userId);
    if (updatedUser) {
      setSelectedUser({ ...updatedUser, points: updatedUser.points + points });

      // Add to history

      await getHistory();
    }

    setLastClaimedPoints(points);
    setIsLoading(false);
  };

  const totalUsers = users.length;
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
  const totalClaims = history.length;
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Points Management System
          </h1>
          <p className="text-gray-600">
            Manage user points and track leaderboard rankings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalUsers}
                </p>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalPoints.toLocaleString()}
                </p>
              </div>
              <Award className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Claims</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalClaims}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loader ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - User Selection and Claim */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Claim Points
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Select User
                    </label>
                    <AddUser onAddUser={getUsers} />
                  </div>

                  <UserSelector
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={handleSelectUser}
                    isOpen={isDropdownOpen}
                    onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                  />

                  <ClaimButton
                    selectedUser={selectedUser}
                    onClaim={handleClaim}
                    lastClaimedPoints={lastClaimedPoints}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Leaderboard and History */}
            <div className="lg:col-span-2 space-y-6">
              <Leaderboard users={users} />
              <History history={history} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
