import React from "react";
import { FaLeaf, FaUser, FaChartLine, FaTrophy, FaCog } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-4">Please log in to view your profile.</p>
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
            <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=10B981&color=fff`}
                  alt={user.displayName || "User"}
                  className="h-20 w-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.displayName || "EcoTrack User"}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">12</div>
                  <div className="text-sm text-emerald-800">Challenges Joined</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                  <div className="text-sm text-blue-800">Challenges Completed</div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Environmental Impact</h3>
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
                    <span className="text-gray-600">Trees Planted</span>
                    <span className="font-bold text-emerald-600">8</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Joined "Plastic-Free July"</div>
                      <div className="text-sm text-gray-500">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Completed "Zero Waste Week"</div>
                      <div className="text-sm text-gray-500">1 week ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Earned "Energy Saver" Badge</div>
                      <div className="text-sm text-gray-500">2 weeks ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/challenges"
                  className="block w-full text-left px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Browse Challenges
                </a>
                <a
                  href="/my-activities"
                  className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  My Activities
                </a>
                <a
                  href="/achievements"
                  className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Achievements
                </a>
                <a
                  href="/settings"
                  className="block w-full text-left px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Settings
                </a>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaTrophy className="text-emerald-600" />
                  <div>
                    <div className="font-bold text-gray-900">Level 5</div>
                    <div className="text-sm text-gray-600">Eco Warrior</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaChartLine className="text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900">1,847</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUser className="text-purple-600" />
                  <div>
                    <div className="font-bold text-gray-900">Member Since</div>
                    <div className="text-sm text-gray-600">Jan 2024</div>
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

export default Profile;
