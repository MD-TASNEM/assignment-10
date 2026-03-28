// pages/Leaderboard.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaTrophy, FaMedal, FaStar, FaLeaf, FaRecycle, FaWater,
  FaBolt, FaCalendarAlt, FaChartLine, FaFilter, FaSearch,
  FaSpinner, FaUser, FaCrown, FaAward, FaArrowUp, FaArrowDown,
  FaTree, FaHeart, FaGlobe, FaUsers
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

// Mock Data - Complete Leaderboard Data
const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Green",
    impact: 1250,
    badges: 12,
    challengesCompleted: 24,
    avatar: null,
    country: "USA",
    joinDate: "2025-01-15",
    categories: { waste: 450, energy: 380, water: 220, transport: 200 },
    streak: 45,
    weeklyImpact: 85,
    achievements: ["Eco Warrior", "Plastic Free Hero", "Energy Saver"]
  },
  {
    rank: 2,
    name: "Mike Thompson",
    impact: 1120,
    badges: 10,
    challengesCompleted: 21,
    avatar: null,
    country: "Canada",
    joinDate: "2025-02-01",
    categories: { waste: 380, energy: 420, water: 180, transport: 140 },
    streak: 38,
    weeklyImpact: 72,
    achievements: ["Carbon Champion", "Water Guardian", "Green Leader"]
  },
  {
    rank: 3,
    name: "Emma Waters",
    impact: 980,
    badges: 9,
    challengesCompleted: 19,
    avatar: null,
    country: "UK",
    joinDate: "2025-01-20",
    categories: { waste: 320, energy: 280, water: 240, transport: 140 },
    streak: 32,
    weeklyImpact: 68,
    achievements: ["Water Guardian", "Eco Warrior", "Plastic Free"]
  },
  {
    rank: 4,
    name: "David Chen",
    impact: 890,
    badges: 8,
    challengesCompleted: 17,
    avatar: null,
    country: "Australia",
    joinDate: "2025-02-10",
    categories: { waste: 290, energy: 240, water: 190, transport: 170 },
    streak: 28,
    weeklyImpact: 62,
    achievements: ["Sustainable Transport", "Energy Saver"]
  },
  {
    rank: 5,
    name: "Lisa Rodriguez",
    impact: 780,
    badges: 7,
    challengesCompleted: 15,
    avatar: null,
    country: "Spain",
    joinDate: "2025-02-15",
    categories: { waste: 260, energy: 210, water: 160, transport: 150 },
    streak: 25,
    weeklyImpact: 58,
    achievements: ["Waste Warrior", "Green Living"]
  },
  {
    rank: 6,
    name: "Alex Kumar",
    impact: 670,
    badges: 6,
    challengesCompleted: 13,
    avatar: null,
    country: "India",
    joinDate: "2025-03-01",
    categories: { waste: 220, energy: 180, water: 140, transport: 130 },
    streak: 22,
    weeklyImpact: 52,
    achievements: ["Eco Novice", "Recycle Hero"]
  },
  {
    rank: 7,
    name: "Nina Johnson",
    impact: 590,
    badges: 5,
    challengesCompleted: 11,
    avatar: null,
    country: "Germany",
    joinDate: "2025-03-05",
    categories: { waste: 190, energy: 160, water: 120, transport: 120 },
    streak: 19,
    weeklyImpact: 48,
    achievements: ["Energy Saver"]
  },
  {
    rank: 8,
    name: "Oliver Smith",
    impact: 520,
    badges: 5,
    challengesCompleted: 10,
    avatar: null,
    country: "France",
    joinDate: "2025-03-10",
    categories: { waste: 170, energy: 140, water: 110, transport: 100 },
    streak: 16,
    weeklyImpact: 44,
    achievements: ["Green Beginner"]
  },
  {
    rank: 9,
    name: "Emma Watson",
    impact: 480,
    badges: 4,
    challengesCompleted: 9,
    avatar: null,
    country: "New Zealand",
    joinDate: "2025-03-12",
    categories: { waste: 150, energy: 120, water: 100, transport: 110 },
    streak: 14,
    weeklyImpact: 41,
    achievements: ["Plastic Free Starter"]
  },
  {
    rank: 10,
    name: "Lucas Brown",
    impact: 450,
    badges: 4,
    challengesCompleted: 8,
    avatar: null,
    country: "Brazil",
    joinDate: "2025-03-15",
    categories: { waste: 140, energy: 110, water: 90, transport: 110 },
    streak: 12,
    weeklyImpact: 38,
    achievements: ["Eco Enthusiast"]
  },
  {
    rank: 11,
    name: "Sofia Martinez",
    impact: 420,
    badges: 3,
    challengesCompleted: 7,
    avatar: null,
    country: "Mexico",
    joinDate: "2025-03-18",
    categories: { waste: 130, energy: 100, water: 80, transport: 110 },
    streak: 10,
    weeklyImpact: 35,
    achievements: ["Getting Started"]
  },
  {
    rank: 12,
    name: "James Wilson",
    impact: 390,
    badges: 3,
    challengesCompleted: 6,
    avatar: null,
    country: "Ireland",
    joinDate: "2025-03-20",
    categories: { waste: 120, energy: 90, water: 70, transport: 110 },
    streak: 8,
    weeklyImpact: 32,
    achievements: ["New Member"]
  },
  {
    rank: 13,
    name: "Chloe Taylor",
    impact: 360,
    badges: 2,
    challengesCompleted: 5,
    avatar: null,
    country: "Sweden",
    joinDate: "2025-03-22",
    categories: { waste: 110, energy: 80, water: 60, transport: 110 },
    streak: 6,
    weeklyImpact: 29,
    achievements: ["Just Started"]
  },
  {
    rank: 14,
    name: "Daniel Lee",
    impact: 330,
    badges: 2,
    challengesCompleted: 4,
    avatar: null,
    country: "South Korea",
    joinDate: "2025-03-24",
    categories: { waste: 100, energy: 70, water: 50, transport: 110 },
    streak: 4,
    weeklyImpact: 26,
    achievements: []
  },
  {
    rank: 15,
    name: "Maya Patel",
    impact: 300,
    badges: 1,
    challengesCompleted: 3,
    avatar: null,
    country: "Singapore",
    joinDate: "2025-03-26",
    categories: { waste: 90, energy: 60, water: 40, transport: 110 },
    streak: 2,
    weeklyImpact: 23,
    achievements: ["First Challenge"]
  }
];

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in flex items-center space-x-2`}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
};

const Leaderboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("total");
  const [sortBy, setSortBy] = useState("rank");
  const [toast, setToast] = useState(null);
  const [showUserRank, setShowUserRank] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Find current user in leaderboard (if logged in)
  const currentUserRank = user ? leaderboardData.findIndex(u => u.name.toLowerCase() === (user.displayName || "").toLowerCase()) : -1;
  const userStats = currentUserRank !== -1 ? leaderboardData[currentUserRank] : null;

  // Filter and sort leaderboard data
  const getFilteredLeaderboard = () => {
    let filtered = [...leaderboardData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "impact") {
      filtered.sort((a, b) => b.impact - a.impact);
    } else if (sortBy === "badges") {
      filtered.sort((a, b) => b.badges - a.badges);
    } else if (sortBy === "challenges") {
      filtered.sort((a, b) => b.challengesCompleted - a.challengesCompleted);
    } else if (sortBy === "streak") {
      filtered.sort((a, b) => b.streak - a.streak);
    } else {
      filtered.sort((a, b) => a.rank - b.rank);
    }

    return filtered;
  };

  const filteredData = getFilteredLeaderboard();
  const mostBadgesUser = [...leaderboardData].sort(
    (a, b) => b.badges - a.badges,
  )[0];
  const longestStreakUser = [...leaderboardData].sort(
    (a, b) => b.streak - a.streak,
  )[0];

  // Calculate global stats
  const globalStats = {
    totalImpact: leaderboardData.reduce((sum, u) => sum + u.impact, 0),
    totalBadges: leaderboardData.reduce((sum, u) => sum + u.badges, 0),
    totalChallenges: leaderboardData.reduce((sum, u) => sum + u.challengesCompleted, 0),
    averageWeeklyImpact: Math.floor(leaderboardData.reduce((sum, u) => sum + u.weeklyImpact, 0) / leaderboardData.length),
    topCountry: [...new Map(leaderboardData.map(u => [u.country, u])).values()]
      .sort((a, b) => b.impact - a.impact)[0]?.country || "USA"
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaCrown className="text-yellow-500 text-2xl" />;
    if (rank === 2) return <FaMedal className="text-gray-400 text-2xl" />;
    if (rank === 3) return <FaMedal className="text-orange-500 text-2xl" />;
    return null;
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return "bg-yellow-500";
    if (rank === 2) return "bg-gray-400";
    if (rank === 3) return "bg-orange-500";
    return "bg-green-500";
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  // Skeleton Loader
  const SkeletonRow = () => (
    <div className="flex items-center justify-between p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-20"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg">
            <FaTrophy className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🏆 Community Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrate our top eco-warriors making the biggest impact on our planet!
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-2xl font-bold text-green-600">{globalStats.totalImpact.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Impact (kg CO₂)</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-2">🏅</div>
            <div className="text-2xl font-bold text-green-600">{globalStats.totalBadges}</div>
            <div className="text-xs text-gray-500">Total Badges Earned</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold text-green-600">{globalStats.totalChallenges}</div>
            <div className="text-xs text-gray-500">Challenges Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-green-600">{globalStats.topCountry}</div>
            <div className="text-xs text-gray-500">Top Contributing Country</div>
          </div>
        </div>

        {/* Your Rank Section */}
        {user && userStats && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className={`w-16 h-16 rounded-full ${getRankBadgeColor(userStats.rank)} flex items-center justify-center text-2xl font-bold`}>
                  #{userStats.rank}
                </div>
                <div>
                  <p className="text-sm opacity-90">Your Current Rank</p>
                  <p className="text-2xl font-bold">{user.displayName || userStats.name}</p>
                  <p className="text-sm">{userStats.impact} kg CO₂ saved</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{userStats.badges}</p>
                  <p className="text-xs opacity-90">Badges</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{userStats.challengesCompleted}</p>
                  <p className="text-xs opacity-90">Challenges</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{userStats.streak}</p>
                  <p className="text-xs opacity-90">Day Streak</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative md:w-48">
              <FaChartLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="rank">Sort by Rank</option>
                <option value="impact">Sort by Impact</option>
                <option value="badges">Sort by Badges</option>
                <option value="challenges">Sort by Challenges</option>
                <option value="streak">Sort by Streak</option>
              </select>
            </div>
            <div className="relative md:w-48">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Contributor</div>
                <div className="col-span-2 text-center">Impact</div>
                <div className="col-span-2 text-center">Badges</div>
                <div className="col-span-2 text-center">Challenges</div>
                <div className="col-span-1 text-center">Streak</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredData.map((user) => (
                <div
                  key={user.rank}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors ${user.name === userStats?.name ? 'bg-green-50 border-l-4 border-green-500' : ''}`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1 flex items-center space-x-2">
                      {getRankIcon(user.rank)}
                      <span className="font-bold text-gray-900">#{user.rank}</span>
                    </div>

                    {/* Contributor Info */}
                    <div className="col-span-4 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(user.name)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.country}</p>
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="col-span-2 text-center">
                      <p className="font-bold text-green-600">{user.impact} kg</p>
                      <p className="text-xs text-gray-500">CO₂ saved</p>
                    </div>

                    {/* Badges */}
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <FaStar className="text-yellow-500" size={14} />
                        <span className="font-semibold">{user.badges}</span>
                      </div>
                      <p className="text-xs text-gray-500">earned</p>
                    </div>

                    {/* Challenges */}
                    <div className="col-span-2 text-center">
                      <p className="font-semibold">{user.challengesCompleted}</p>
                      <p className="text-xs text-gray-500">completed</p>
                    </div>

                    {/* Streak */}
                    <div className="col-span-1 text-center">
                      <p className="font-semibold text-orange-600">🔥 {user.streak}</p>
                      <p className="text-xs text-gray-500">days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Showcase */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaAward className="text-yellow-500 mr-2" />
            Top Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-3xl mb-3">👑</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Most Impactful</h3>
              <p className="text-gray-600">{leaderboardData[0].name}</p>
              <p className="text-sm text-green-600 mt-1">{leaderboardData[0].impact} kg CO₂ saved</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl mb-3">🏅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Most Badges</h3>
              <p className="text-gray-600">{mostBadgesUser.name}</p>
              <p className="text-sm text-green-600 mt-1">{mostBadgesUser.badges} badges earned</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Longest Streak</h3>
              <p className="text-gray-600">{longestStreakUser.name}</p>
              <p className="text-sm text-green-600 mt-1">{longestStreakUser.streak} days active</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Want to See Your Name Here?</h3>
          <p className="text-green-100 mb-6">Join challenges, reduce your carbon footprint, and climb the leaderboard!</p>
          <button
            type="button"
            onClick={() => navigate("/challenges")}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Join a Challenge Today →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
