// pages/MyProfile.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, Navigate } from "react-router";
import {
  FaLeaf,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaCamera,
  FaEdit,
  FaTrophy,
  FaChartLine,
  FaRecycle,
  FaWater,
  FaTree,
  FaMedal,
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaSpinner,
  FaSignOutAlt,
  FaHeart,
} from "react-icons/fa";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock user impact data (in real app, fetch from API)
  const userImpact = {
    totalCO2Saved: 234,
    totalPlasticReduced: 128,
    totalWaterSaved: 1250,
    totalEnergySaved: 890,
    challengesCompleted: 12,
    currentStreak: 15,
    badgesEarned: 5,
    totalBadges: 12,
    rank: 124,
    totalUsers: 3420,
    contributions: {
      waste: 45,
      energy: 38,
      water: 22,
      transport: 15,
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      toast.success("Logged out successfully. Come back soon! 🌱", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
          borderRadius: "12px",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formatUserId = (uid) => {
    return `${uid.substring(0, 8)}...${uid.substring(uid.length - 8)}`;
  };

  const getAvatarUrl = () => {
    if (user.photoURL) {
      return user.photoURL;
    }
    if (user.email) {
      const name = encodeURIComponent(
        user.displayName || user.email.split("@")[0],
      );
      return `https://ui-avatars.com/api/?name=${name}&background=10B981&color=fff&bold=true`;
    }
    return null;
  };

  const getUserInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "🌱";
  };

  const getAvatarBackgroundColor = () => {
    const seed = user.uid || user.email || "user";
    const colors = [
      "from-green-500 to-emerald-600",
      "from-emerald-500 to-green-600",
      "from-teal-500 to-green-600",
      "from-green-600 to-teal-600",
      "from-emerald-600 to-green-500",
      "from-green-500 to-teal-500",
    ];

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const avatarUrl = getAvatarUrl();
  const userInitials = getUserInitials();
  const avatarBackground = getAvatarBackgroundColor();
  const joinDate = new Date(user.metadata?.creationTime);
  const memberSince = joinDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <FaLeaf className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            My Eco Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your environmental impact and manage your sustainability
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-40 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>

                {/* Profile Image */}
                <div className="absolute -bottom-12 left-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg bg-white p-1">
                      {avatarUrl ? (
                        <img
                          className="w-full h-full rounded-xl object-cover"
                          src={avatarUrl}
                          alt={user.displayName || "User"}
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full rounded-xl bg-gradient-to-br ${avatarBackground} flex items-center justify-center ${
                          avatarUrl ? "hidden" : "flex"
                        }`}
                      >
                        <span className="text-3xl font-bold text-white">
                          {userInitials}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleUpdate}
                      className="absolute -bottom-2 -right-2 bg-green-500 hover:bg-green-600 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all duration-200 shadow-md"
                    >
                      <FaCamera className="text-white text-sm" />
                    </button>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="absolute top-6 right-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-white/90 hover:bg-white text-gray-800 hover:text-green-600 px-5 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <FaEdit className="text-sm" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-16 pb-8 px-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {user.displayName || "Eco Warrior"}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FaCalendarAlt className="text-green-500" />
                    <span>Member since {memberSince}</span>
                    <span className="mx-2">•</span>
                    <FaCheckCircle className="text-green-500" />
                    <span>
                      {user.emailVerified
                        ? "Verified Account"
                        : "Email Not Verified"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <FaEnvelope className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <FaShieldAlt className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        User ID
                      </label>
                      <p className="text-gray-900 font-mono text-sm">
                        {formatUserId(user.uid)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Stats & Actions */}
          <div className="space-y-6">
            {/* Impact Stats Summary */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <FaChartLine className="text-2xl" />
                <h3 className="text-lg font-bold">Your Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-2xl font-bold">
                    {userImpact.totalCO2Saved}
                  </p>
                  <p className="text-xs text-green-100">kg CO₂ Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {userImpact.totalPlasticReduced}
                  </p>
                  <p className="text-xs text-green-100">kg Plastic Reduced</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {userImpact.totalWaterSaved}
                  </p>
                  <p className="text-xs text-green-100">L Water Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {userImpact.totalEnergySaved}
                  </p>
                  <p className="text-xs text-green-100">kWh Energy Saved</p>
                </div>
              </div>
              <div className="border-t border-green-500 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rank</span>
                  <span className="font-bold">
                    #{userImpact.rank} of {userImpact.totalUsers}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">Current Streak</span>
                  <span className="font-bold flex items-center">
                    <FaHeart className="text-red-400 mr-1" />
                    {userImpact.currentStreak} days
                  </span>
                </div>
              </div>
            </div>

            {/* Badges Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <FaMedal className="text-yellow-500 text-xl" />
                <h3 className="font-semibold text-gray-900">Eco Badges</h3>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Progress to next badge
                </span>
                <span className="text-sm font-medium text-green-600">
                  {userImpact.badgesEarned}/{userImpact.totalBadges}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(userImpact.badgesEarned / userImpact.totalBadges) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <FaTrophy className="text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Eco Warrior</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <FaRecycle className="text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Plastic Free</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg opacity-50">
                  <FaWater className="text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Water Saver</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FaLeaf className="text-green-500 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                    onClick={() => navigate("/my-activities")}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FaChartLine className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                    View My Activities
                  </span>
                </button>

                <button
                  onClick={() => navigate("/challenges")}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FaTrophy className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                    Join New Challenge
                  </span>
                </button>

                <button
                  onClick={() => navigate("/eco-tips")}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FaStar className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                    Share Eco Tip
                  </span>
                </button>

                <button
                  onClick={() => navigate("/leaderboard")}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FaUsers className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                    View Leaderboard
                  </span>
                </button>

                <div className="border-t border-gray-200 pt-3 mt-2">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-red-50 transition-all duration-200 group"
                  >
                    <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                      {isLoggingOut ? (
                        <FaSpinner className="w-5 h-5 text-red-600 animate-spin" />
                      ) : (
                        <FaSignOutAlt className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span className="text-red-600 font-medium group-hover:text-red-700 transition-colors">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Eco Quote */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 text-center">
              <p className="text-green-800 italic text-sm">
                "The Earth is what we all have in common. Every small action
                contributes to a greener future."
              </p>
              <div className="mt-3 flex justify-center space-x-1">
                <FaLeaf className="text-green-600 text-xs" />
                <FaLeaf className="text-green-600 text-xs" />
                <FaLeaf className="text-green-600 text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact Breakdown */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-6 flex items-center">
              <FaTree className="text-green-500 mr-2" />
              Environmental Impact Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Waste Reduction</span>
                  <span className="text-sm font-semibold text-green-600">
                    {userImpact.contributions.waste}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${userImpact.contributions.waste}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Energy Conservation
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {userImpact.contributions.energy}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${userImpact.contributions.energy}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Water Conservation
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {userImpact.contributions.water}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${userImpact.contributions.water}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Sustainable Transport
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {userImpact.contributions.transport}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${userImpact.contributions.transport}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
