// pages/Impact.jsx
import React, { useState, useContext, useEffect } from "react";
import {
  FaLeaf, FaRecycle, FaWater, FaCar, FaTree, FaBolt,
  FaTrophy, FaChartLine, FaUsers, FaGlobe, FaCalendarAlt,
  FaCheckCircle, FaSpinner, FaShareAlt, FaDownload,
  FaHeart, FaStar, FaMedal, FaAward
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

// Mock Data - Community Impact Stats
const communityStats = {
  totalCO2Saved: 12500, // kg
  totalPlasticReduced: 8450, // kg
  totalWaterSaved: 125000, // liters
  totalEnergySaved: 87500, // kWh
  treesPlanted: 1250,
  activeParticipants: 3420,
  totalChallengesCompleted: 5678,
  badgesAwarded: 890,
  countriesReached: 45
};

// Mock Data - Individual User Impact
const userImpactData = {
  personalCO2Reduced: 234,
  personalPlasticReduced: 128,
  personalWaterSaved: 1250,
  personalEnergySaved: 890,
  challengesCompleted: 12,
  currentStreak: 15,
  badges: [
    { id: 1, name: "Eco Warrior", icon: "🌱", earned: true, date: "2026-02-15" },
    { id: 2, name: "Plastic Free Hero", icon: "♻️", earned: true, date: "2026-02-28" },
    { id: 3, name: "Energy Saver", icon: "⚡", earned: true, date: "2026-03-10" },
    { id: 4, name: "Water Guardian", icon: "💧", earned: false },
    { id: 5, name: "Carbon Champion", icon: "🌍", earned: false },
    { id: 6, name: "Green Leader", icon: "🏆", earned: false }
  ],
  recentActivities: [
    { id: 1, title: "Plastic-Free July Challenge", impact: "15kg plastic saved", date: "2026-03-20", status: "Completed" },
    { id: 2, title: "Energy Saving Week", impact: "45kWh saved", date: "2026-03-15", status: "Completed" },
    { id: 3, title: "Bike to Work Challenge", impact: "12kg CO2 reduced", date: "2026-03-10", status: "Completed" },
    { id: 4, title: "Water Conservation Month", impact: "80L water saved", date: "2026-03-05", status: "In Progress" }
  ]
};

// Mock Data - Leaderboard
const leaderboardData = [
  { rank: 1, name: "Sarah Green", impact: 1250, badges: 8, avatar: null, country: "USA" },
  { rank: 2, name: "Mike Thompson", impact: 1120, badges: 7, avatar: null, country: "Canada" },
  { rank: 3, name: "Emma Waters", impact: 980, badges: 6, avatar: null, country: "UK" },
  { rank: 4, name: "David Chen", impact: 890, badges: 6, avatar: null, country: "Australia" },
  { rank: 5, name: "Lisa Rodriguez", impact: 780, badges: 5, avatar: null, country: "Spain" },
  { rank: 6, name: "Alex Kumar", impact: 670, badges: 5, avatar: null, country: "India" },
  { rank: 7, name: "Nina Johnson", impact: 590, badges: 4, avatar: null, country: "Germany" },
  { rank: 8, name: "Oliver Smith", impact: 520, badges: 4, avatar: null, country: "France" },
  { rank: 9, name: "Emma Watson", impact: 480, badges: 4, avatar: null, country: "New Zealand" },
  { rank: 10, name: "Lucas Brown", impact: 450, badges: 3, avatar: null, country: "Brazil" }
];

// Mock Data - Monthly Impact Trends
const monthlyTrends = [
  { month: "Jan", CO2: 850, plastic: 420, water: 8500 },
  { month: "Feb", CO2: 920, plastic: 510, water: 9800 },
  { month: "Mar", CO2: 1100, plastic: 680, water: 11200 },
  { month: "Apr", CO2: 1350, plastic: 720, water: 13400 },
  { month: "May", CO2: 1580, plastic: 890, water: 15600 },
  { month: "Jun", CO2: 1820, plastic: 980, water: 17800 }
];

// Simple Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in`}>
      {message}
    </div>
  );
};

// Impact Card Component
const ImpactCard = ({ icon, title, value, unit, color, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className={`inline-flex p-3 rounded-xl ${color} mb-4`}>
      {icon}
    </div>
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()} {unit}</p>
    <p className="text-xs text-gray-400 mt-2">{description}</p>
  </div>
);

// Badge Card Component
const BadgeCard = ({ badge, index }) => (
  <div className={`text-center p-4 rounded-lg transition-all duration-300 ${badge.earned ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' : 'bg-gray-50 border border-gray-200 opacity-60'}`}>
    <div className="text-4xl mb-2">{badge.icon}</div>
    <h4 className="font-semibold text-gray-900 text-sm">{badge.name}</h4>
    {badge.earned ? (
      <>
        <p className="text-xs text-green-600 mt-1">Earned {new Date(badge.date).toLocaleDateString()}</p>
        <FaCheckCircle className="text-green-500 mx-auto mt-2" size={16} />
      </>
    ) : (
      <p className="text-xs text-gray-400 mt-1">Locked</p>
    )}
  </div>
);

// Leaderboard Item Component
const LeaderboardItem = ({ user, rank }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg">
    <div className="flex items-center space-x-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
        rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-orange-500' : 'bg-green-500'
      }`}>
        {rank}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{user.name}</p>
        <p className="text-xs text-gray-500">{user.country}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-green-600">{user.impact} kg</p>
      <p className="text-xs text-gray-500">{user.badges} badges</p>
    </div>
  </div>
);

const Impact = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userImpact, setUserImpact] = useState(userImpactData);
  const [shareLoading, setShareLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [toast, setToast] = useState(null);

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

  const handleShareImpact = async () => {
    setShareLoading(true);

    const shareData = {
      title: "My EcoTrack Impact",
      text: `I've saved ${userImpact.personalCO2Reduced}kg of CO2, reduced ${userImpact.personalPlasticReduced}kg of plastic, and completed ${userImpact.challengesCompleted} challenges with EcoTrack! Join me in making a difference! 🌱`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast("Impact shared successfully! 🌍", 'success');
      } else {
        await navigator.clipboard.writeText(shareData.text);
        showToast("Impact stats copied to clipboard!", 'info');
      }
    } catch (error) {
      console.log("Error sharing:", error);
    } finally {
      setShareLoading(false);
    }
  };

  const handleDownloadCertificate = () => {
    showToast("Your eco-certificate is being generated! 🌿", 'success');
    // In a real app, this would generate a PDF certificate
  };

  // Calculate total impact
  const totalImpact = communityStats.totalCO2Saved + communityStats.totalPlasticReduced * 2 + communityStats.totalWaterSaved / 1000;
  const treesEquivalent = Math.floor(communityStats.totalCO2Saved / 21); // 21kg CO2 per tree per year

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaChartLine className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Your Environmental Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your contribution to a sustainable future. Every action counts, and together we're making a difference!
          </p>
        </div>

        {/* Personal Impact Section */}
        {user && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Impact Journey</h2>
                  <p className="text-green-100">Welcome back, {user.displayName || "Eco Warrior"}! 🌱</p>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={handleShareImpact}
                    disabled={shareLoading}
                    className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center space-x-2 shadow-md disabled:opacity-50"
                  >
                    {shareLoading ? <FaSpinner className="animate-spin" /> : <FaShareAlt />}
                    <span>Share Impact</span>
                  </button>
                  <button
                    onClick={handleDownloadCertificate}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition-all duration-300 flex items-center space-x-2 shadow-md"
                  >
                    <FaDownload />
                    <span>Certificate</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <FaLeaf className="text-2xl mb-2" />
                  <p className="text-sm opacity-90">CO₂ Reduced</p>
                  <p className="text-2xl font-bold">{userImpact.personalCO2Reduced} kg</p>
                  <p className="text-xs mt-1">Equivalent to planting {Math.floor(userImpact.personalCO2Reduced / 21)} trees</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <FaRecycle className="text-2xl mb-2" />
                  <p className="text-sm opacity-90">Plastic Reduced</p>
                  <p className="text-2xl font-bold">{userImpact.personalPlasticReduced} kg</p>
                  <p className="text-xs mt-1">~ {userImpact.personalPlasticReduced * 50} plastic bottles</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <FaWater className="text-2xl mb-2" />
                  <p className="text-sm opacity-90">Water Saved</p>
                  <p className="text-2xl font-bold">{userImpact.personalWaterSaved} L</p>
                  <p className="text-xs mt-1">~ {Math.floor(userImpact.personalWaterSaved / 40)} showers</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <FaBolt className="text-2xl mb-2" />
                  <p className="text-sm opacity-90">Energy Saved</p>
                  <p className="text-2xl font-bold">{userImpact.personalEnergySaved} kWh</p>
                  <p className="text-xs mt-1">Enough to power a home for {Math.floor(userImpact.personalEnergySaved / 30)} days</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center border-t border-green-500 pt-4">
                <div>
                  <p className="text-sm opacity-90">Current Streak</p>
                  <p className="text-xl font-bold">🔥 {userImpact.currentStreak} days</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Challenges Completed</p>
                  <p className="text-xl font-bold">🏆 {userImpact.challengesCompleted}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Badges Earned</p>
                  <p className="text-xl font-bold">🎖️ {userImpact.badges.filter(b => b.earned).length}/{userImpact.badges.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Badges Section */}
        {user && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FaMedal className="text-yellow-500 mr-2" />
              Your Eco-Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {userImpact.badges.map((badge, index) => (
                <BadgeCard key={badge.id} badge={badge} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Activities */}
        {user && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FaCalendarAlt className="text-green-600 mr-2" />
              Recent Activities
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {userImpact.recentActivities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium">{activity.impact}</p>
                    <p className={`text-xs ${activity.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {activity.status === 'Completed' ? '✓ Completed' : '🔄 In Progress'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Impact Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaGlobe className="text-blue-600 mr-2" />
            Community Impact
          </h2>
          <p className="text-gray-600 mb-6">Together, we're creating a sustainable future. Here's what our community has achieved:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                <SkeletonCard /><SkeletonCard /><SkeletonCard />
              </>
            ) : (
              <>
                <ImpactCard
                  icon={<FaLeaf className="text-green-600 text-2xl" />}
                  title="CO₂ Emissions Saved"
                  value={communityStats.totalCO2Saved}
                  unit="kg"
                  color="bg-green-100"
                  description={`Equivalent to ${treesEquivalent} trees planted`}
                />
                <ImpactCard
                  icon={<FaRecycle className="text-blue-600 text-2xl" />}
                  title="Plastic Waste Reduced"
                  value={communityStats.totalPlasticReduced}
                  unit="kg"
                  color="bg-blue-100"
                  description={`~ ${communityStats.totalPlasticReduced * 50} plastic bottles`}
                />
                <ImpactCard
                  icon={<FaWater className="text-cyan-600 text-2xl" />}
                  title="Water Saved"
                  value={communityStats.totalWaterSaved}
                  unit="L"
                  color="bg-cyan-100"
                  description={`Enough for ${Math.floor(communityStats.totalWaterSaved / 40)} showers`}
                />
                <ImpactCard
                  icon={<FaBolt className="text-yellow-600 text-2xl" />}
                  title="Energy Saved"
                  value={communityStats.totalEnergySaved}
                  unit="kWh"
                  color="bg-yellow-100"
                  description={`Powers ${Math.floor(communityStats.totalEnergySaved / 30)} homes for a month`}
                />
                <ImpactCard
                  icon={<FaTree className="text-green-600 text-2xl" />}
                  title="Trees Planted"
                  value={communityStats.treesPlanted}
                  unit="trees"
                  color="bg-green-100"
                  description="Growing our green canopy"
                />
                <ImpactCard
                  icon={<FaUsers className="text-purple-600 text-2xl" />}
                  title="Active Participants"
                  value={communityStats.activeParticipants}
                  unit="members"
                  color="bg-purple-100"
                  description={`In ${communityStats.countriesReached} countries`}
                />
              </>
            )}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaChartLine className="text-green-600 mr-2" />
            Monthly Impact Trends
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Our community impact is growing every month!</p>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="month">Last 6 Months</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="space-y-4">
              {monthlyTrends.map((trend, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{trend.month}</span>
                    <span>{trend.CO2} kg CO₂</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(trend.CO2 / 2000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaTrophy className="text-yellow-500 mr-2" />
            Community Leaderboard
          </h2>
          <p className="text-gray-600 mb-6">Top contributors making the biggest impact</p>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3">
              <div className="grid grid-cols-3 gap-4">
                <div>Rank</div>
                <div>Contributor</div>
                <div className="text-right">Impact</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {leaderboardData.map((user, index) => (
                <LeaderboardItem key={index} user={user} rank={user.rank} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Make More Impact?</h3>
          <p className="text-green-100 mb-6">Join new challenges and earn more badges to increase your positive impact on the environment.</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore New Challenges →
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

export default Impact;