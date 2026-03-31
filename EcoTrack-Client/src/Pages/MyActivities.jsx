import React from "react";
import { FaLeaf, FaChartLine, FaTrophy, FaCalendarAlt, FaUsers, FaLeaf as FaLeafIcon } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const MyActivities = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-4">Please log in to view your activities.</p>
          <a
            href="/login"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-2xl text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">EcoTrack</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">My Activities</h1>
          </div>
        </div>
      </div>

      {/* Activities Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Challenges */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Challenges</h2>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  3 Active
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Challenge 1 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FaLeafIcon className="text-emerald-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Plastic-Free July</h3>
                      <p className="text-sm text-gray-600 mb-2">Day 15 of 30</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Started: July 1, 2024</span>
                        <span>Ends: July 31, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge 2 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-blue-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Zero Waste Week</h3>
                      <p className="text-sm text-gray-600 mb-2">Day 5 of 7</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "71%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Started: July 8, 2024</span>
                        <span>Ends: July 14, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge 3 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FaTrophy className="text-yellow-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Energy Saver</h3>
                      <p className="text-sm text-gray-600 mb-2">Day 12 of 14</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "86%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Started: July 1, 2024</span>
                        <span>Ends: July 14, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  View All Challenges
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Challenges</span>
                    <span className="font-bold text-gray-900">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-bold text-emerald-600">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-bold text-emerald-600">67%</span>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CO₂ Saved</span>
                    <span className="font-bold text-emerald-600">127.5 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plastic Reduced</span>
                    <span className="font-bold text-emerald-600">45.2 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Saved</span>
                    <span className="font-bold text-emerald-600">1,250 gallons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trees Equivalent</span>
                    <span className="font-bold text-emerald-600">8 trees</span>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-yellow-50 rounded-lg p-3">
                    <FaTrophy className="text-yellow-600 text-xl" />
                    <div>
                      <div className="font-semibold text-yellow-800">First Week Complete</div>
                      <div className="text-sm text-yellow-600">Zero Waste Week</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-emerald-50 rounded-lg p-3">
                    <FaTrophy className="text-emerald-600 text-xl" />
                    <div>
                      <div className="font-semibold text-emerald-800">Energy Saver</div>
                      <div className="text-sm text-emerald-600">Reduced usage by 25%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-blue-50 rounded-lg p-3">
                    <FaTrophy className="text-blue-600 text-xl" />
                    <div>
                      <div className="font-semibold text-blue-800">7-Day Streak</div>
                      <div className="text-sm text-blue-600">Daily challenges completed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">15</div>
                    <div className="text-sm text-gray-600">Days Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2,450</div>
                    <div className="text-sm text-gray-600">Eco Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-gray-600">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-600">Challenges Joined</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
