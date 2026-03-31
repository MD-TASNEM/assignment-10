import React, { useState, useEffect } from "react";
import {
  FaLeaf,
  FaTrophy,
  FaMedal,
  FaStar,
  FaAward,
  FaChartLine,
  FaCalendarAlt,
  FaFire,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Achievements = () => {
  const { user } = useContext(AuthContext);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const [achievementsResponse, statsResponse] = await Promise.all([
        //   achievementsAPI.getUserAchievements(user.uid),
        //   statsAPI.getUserStats(user.uid)
        // ]);
        // setAchievements(achievementsResponse.data);
        // setStats(statsResponse.data);

        // Mock data for now
        const mockAchievements = [
          {
            id: 1,
            title: "Eco Warrior",
            description: "Complete your first challenge",
            icon: "🌱",
            category: "milestone",
            points: 100,
            earnedDate: "2024-06-15",
            isEarned: true,
            rarity: "common",
            progress: 100,
            requirement: "Complete 1 challenge",
          },
          {
            id: 2,
            title: "Plastic-Free Champion",
            description: "Complete a 30-day plastic-free challenge",
            icon: "♻️",
            category: "challenge",
            points: 500,
            earnedDate: "2024-06-20",
            isEarned: true,
            rarity: "rare",
            progress: 100,
            requirement: "Complete Plastic-Free July",
          },
          {
            id: 3,
            title: "Energy Saver",
            description: "Reduce energy consumption by 25%",
            icon: "⚡",
            category: "impact",
            points: 300,
            earnedDate: "2024-06-25",
            isEarned: true,
            rarity: "uncommon",
            progress: 100,
            requirement: "Save 25% energy",
          },
          {
            id: 4,
            title: "Water Guardian",
            description: "Save 500 gallons of water",
            icon: "💧",
            category: "impact",
            points: 250,
            earnedDate: "2024-07-01",
            isEarned: true,
            rarity: "uncommon",
            progress: 100,
            requirement: "Save 500 gallons",
          },
          {
            id: 5,
            title: "7-Day Streak",
            description: "Maintain a 7-day challenge streak",
            icon: "🔥",
            category: "streak",
            points: 200,
            earnedDate: "2024-07-05",
            isEarned: true,
            rarity: "common",
            progress: 100,
            requirement: "7 day streak",
          },
          {
            id: 6,
            title: "Community Leader",
            description: "Reach top 10 in the leaderboard",
            icon: "👑",
            category: "social",
            points: 750,
            earnedDate: null,
            isEarned: false,
            rarity: "legendary",
            progress: 65,
            requirement: "Top 10 leaderboard",
          },
          {
            id: 7,
            title: "Carbon Neutral",
            description: "Save 1000 kg of CO₂",
            icon: "🌍",
            category: "impact",
            points: 1000,
            earnedDate: null,
            isEarned: false,
            rarity: "epic",
            progress: 45,
            requirement: "Save 1000 kg CO₂",
          },
          {
            id: 8,
            title: "Perfect Score",
            description: "Complete a challenge with 100% success rate",
            icon: "⭐",
            category: "challenge",
            points: 400,
            earnedDate: null,
            isEarned: false,
            rarity: "rare",
            progress: 0,
            requirement: "100% challenge completion",
          },
        ];

        const mockStats = {
          totalPoints: 1350,
          totalAchievements: 5,
          totalBadges: 12,
          currentStreak: 15,
          longestStreak: 45,
          challengesCompleted: 8,
          totalImpact: {
            co2Saved: 245.5,
            plasticReduced: 89.2,
            waterSaved: 1250,
            treesEquivalent: 12,
          },
        };

        setAchievements(mockAchievements);
        setStats(mockStats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchAchievements();
    } else {
      setLoading(false);
    }
  }, [user]);

  const categories = [
    { value: "all", label: "All Achievements" },
    { value: "milestone", label: "Milestones" },
    { value: "challenge", label: "Challenges" },
    { value: "impact", label: "Environmental Impact" },
    { value: "streak", label: "Streaks" },
    { value: "social", label: "Social" },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "uncommon":
        return "bg-green-100 text-green-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "epic":
        return "bg-purple-100 text-purple-800";
      case "legendary":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case "common":
        return "border-gray-300";
      case "uncommon":
        return "border-green-300";
      case "rare":
        return "border-blue-300";
      case "epic":
        return "border-purple-300";
      case "legendary":
        return "border-yellow-300";
      default:
        return "border-gray-300";
    }
  };

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter(
          (achievement) => achievement.category === selectedCategory,
        );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500 mb-4">
            Please log in to view your achievements.
          </p>
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
            <h1 className="text-xl font-bold text-gray-900">My Achievements</h1>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaTrophy className="text-3xl text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Total Points
              </h3>
            </div>
            <div className="text-3xl font-bold text-emerald-600">
              {stats.totalPoints?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Eco points earned</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaAward className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Achievements
              </h3>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.totalAchievements || 0}
            </div>
            <div className="text-sm text-gray-600">Unlocked</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaFire className="text-3xl text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Current Streak
              </h3>
            </div>
            <div className="text-3xl font-bold text-orange-600">
              {stats.currentStreak || 0}
            </div>
            <div className="text-sm text-gray-600">Days active</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="text-3xl text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Challenges
              </h3>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {stats.challengesCompleted || 0}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-r-2 border-t-2 border-emerald-500"></div>
            <p className="mt-4 text-gray-600">Loading achievements...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 ${getRarityBorder(achievement.rarity)} ${
                  !achievement.isEarned ? "opacity-75" : ""
                }`}
              >
                <div className={`p-4 ${getRarityColor(achievement.rarity)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex items-center space-x-2">
                      {achievement.isEarned ? (
                        <FaUnlock className="text-green-600" />
                      ) : (
                        <FaLock className="text-gray-400" />
                      )}
                      <span className="text-sm font-medium">
                        {achievement.points} pts
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>
                  <div className="text-xs text-gray-500 mb-2">
                    {achievement.requirement}
                  </div>
                  {achievement.isEarned ? (
                    <div className="text-xs text-green-600 font-medium">
                      Earned:{" "}
                      {new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        Progress: {achievement.progress}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Impact Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Environmental Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <div className="text-2xl font-bold text-emerald-600">
                {stats.totalImpact?.co2Saved || 0} kg
              </div>
              <div className="text-sm text-gray-600">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">♻️</div>
              <div className="text-2xl font-bold text-emerald-600">
                {stats.totalImpact?.plasticReduced || 0} kg
              </div>
              <div className="text-sm text-gray-600">Plastic Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💧</div>
              <div className="text-2xl font-bold text-emerald-600">
                {stats.totalImpact?.waterSaved || 0} gal
              </div>
              <div className="text-sm text-gray-600">Water Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌳</div>
              <div className="text-2xl font-bold text-emerald-600">
                {stats.totalImpact?.treesEquivalent || 0}
              </div>
              <div className="text-sm text-gray-600">Trees Equivalent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
