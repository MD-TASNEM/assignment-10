// import React from 'react';

// const EcoTips = () => {
//     return (
//         <div>
//             <p>
//                 Here are some eco-friendly tips to help you reduce your environmental impact:
//             </p>
//             <ul className="list-disc list-inside">
//                 <li>Use reusable bags, bottles, and containers.</li>
//                 <li>Reduce energy consumption by turning off lights and unplugging devices when not in use.</li>
//                 <li>Choose public transportation, walk, or bike instead of driving.</li>
//                 <li>Recycle and compost to minimize waste.</li>
//                 <li>Support local and sustainable products.</li>
//             </ul>
//         </div>
//     );
// };

// export default EcoTips;

// pages/EcoTips.jsx
import React, { useState, useContext, useEffect } from "react";
import {
  FaThumbsUp,
  FaShare,
  FaSearch,
  FaFilter,
  FaPlus,
  FaTimes,
  FaSpinner,
  FaUser,
  FaLeaf,
  FaRecycle,
  FaWater,
  FaCar,
  FaHome,
  FaApple,
  FaLightbulb,
  FaTrash,
  FaChartLine,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

// Mock Data - Complete Tips Collection
const mockTips = [
  {
    _id: "1",
    title: "Start a Compost Bin at Home",
    content:
      "Composting kitchen scraps reduces landfill waste and creates nutrient-rich soil for your garden. Start with a small bin, add brown materials (leaves, paper) and green materials (fruit scraps, coffee grounds), and turn weekly. Within 2-3 months, you'll have beautiful compost for your plants!",
    category: "Waste Reduction",
    author: "user1@example.com",
    authorName: "Sarah Green",
    authorPhoto: null,
    upvotes: 47,
    createdAt: "2026-03-20T10:30:00Z",
  },
  {
    _id: "2",
    title: "Switch to LED Light Bulbs",
    content:
      "LED bulbs use 75% less energy than traditional incandescent bulbs and last 25 times longer. Replacing just 5 bulbs in your home can save up to $100 per year on electricity bills. Plus, they're now available in warm colors that feel just like traditional lighting!",
    category: "Energy Conservation",
    author: "user2@example.com",
    authorName: "Mike Thompson",
    authorPhoto: null,
    upvotes: 32,
    createdAt: "2026-03-19T14:15:00Z",
  },
  {
    _id: "3",
    title: "Fix Leaky Faucets Immediately",
    content:
      "A single dripping faucet can waste over 3,000 gallons of water per year. Most leaks are simple to fix - just replace the washer or O-ring. Check under sinks and around toilets regularly for hidden leaks. This simple maintenance saves water and reduces your utility bills!",
    category: "Water Conservation",
    author: "user3@example.com",
    authorName: "Emma Waters",
    authorPhoto: null,
    upvotes: 28,
    createdAt: "2026-03-18T09:45:00Z",
  },
  {
    _id: "4",
    title: "Use Public Transport Once a Week",
    content:
      "If you drive alone to work, try taking public transport just one day a week. This simple switch can reduce your annual carbon footprint by up to 800 kg of CO2. Use the time to read, listen to podcasts, or simply relax while someone else does the driving!",
    category: "Sustainable Transport",
    author: "user4@example.com",
    authorName: "David Greenfield",
    authorPhoto: null,
    upvotes: 56,
    createdAt: "2026-03-17T16:20:00Z",
  },
  {
    _id: "5",
    title: "Shop at Local Farmers Markets",
    content:
      "Buying locally grown food reduces transportation emissions and supports your local economy. Food from farmers markets travels an average of 27 miles compared to 1,500 miles for conventional groceries. Plus, it's fresher, tastier, and often organic!",
    category: "Sustainable Food",
    author: "user5@example.com",
    authorName: "Lisa Chen",
    authorPhoto: null,
    upvotes: 41,
    createdAt: "2026-03-16T11:00:00Z",
  },
  {
    _id: "6",
    title: "Start a Meatless Monday Routine",
    content:
      "Reducing meat consumption just one day a week can save the equivalent of 348 gallons of water per person. Try delicious plant-based alternatives like lentil burgers, tofu stir-fries, or hearty vegetable stews. Your health and the planet will thank you!",
    category: "Sustainable Food",
    author: "user6@example.com",
    authorName: "Alex Rivera",
    authorPhoto: null,
    upvotes: 63,
    createdAt: "2026-03-15T13:30:00Z",
  },
  {
    _id: "7",
    title: "Use Reusable Shopping Bags",
    content:
      "Keep reusable bags in your car or by the door so you never forget them. A single reusable bag can replace over 500 plastic bags in its lifetime. Many stores now offer bag credits, so you'll save money while saving the environment!",
    category: "Waste Reduction",
    author: "user7@example.com",
    authorName: "Natalie Park",
    authorPhoto: null,
    upvotes: 89,
    createdAt: "2026-03-14T08:45:00Z",
  },
  {
    _id: "8",
    title: "Install a Rain Barrel",
    content:
      "Collecting rainwater for your garden reduces water bills and conserves municipal water. One inch of rain on a 1,000 square foot roof yields about 600 gallons of water. Use this free resource for watering plants, washing cars, or cleaning outdoor areas!",
    category: "Water Conservation",
    author: "user8@example.com",
    authorName: "Tom Builder",
    authorPhoto: null,
    upvotes: 34,
    createdAt: "2026-03-13T10:15:00Z",
  },
  {
    _id: "9",
    title: "Unplug Electronics When Not in Use",
    content:
      "Electronics consume energy even when turned off (vampire power). Unplug phone chargers, computers, and kitchen appliances when not in use. Use power strips to make it easy - just flip one switch to cut power to multiple devices at once!",
    category: "Energy Conservation",
    author: "user9@example.com",
    authorName: "Rachel Smart",
    authorPhoto: null,
    upvotes: 45,
    createdAt: "2026-03-12T17:30:00Z",
  },
  {
    _id: "10",
    title: "Start a Kitchen Herb Garden",
    content:
      "Growing your own herbs reduces packaging waste and food miles. Start with easy herbs like basil, mint, and rosemary on your windowsill. You'll always have fresh herbs for cooking, and they make your kitchen smell amazing!",
    category: "Green Living",
    author: "user10@example.com",
    authorName: "Oliver Green",
    authorPhoto: null,
    upvotes: 52,
    createdAt: "2026-03-11T12:00:00Z",
  },
  {
    _id: "11",
    title: "Bike to Work Challenge",
    content:
      "Replace car trips with biking for short distances. Even biking once a week can reduce your carbon footprint significantly. Invest in a good helmet, lights, and reflective gear for safety. Many cities now have bike-sharing programs if you don't own a bike!",
    category: "Sustainable Transport",
    author: "user11@example.com",
    authorName: "Chris Wheeler",
    authorPhoto: null,
    upvotes: 38,
    createdAt: "2026-03-10T09:00:00Z",
  },
  {
    _id: "12",
    title: "Say No to Single-Use Plastics",
    content:
      "Carry a reusable water bottle, coffee cup, and cutlery set. Refuse plastic straws and takeaway containers when possible. These small choices add up - over 8 million tons of plastic enter our oceans each year, and individual actions make a difference!",
    category: "Waste Reduction",
    author: "user12@example.com",
    authorName: "Maya Ocean",
    authorPhoto: null,
    upvotes: 104,
    createdAt: "2026-03-09T15:45:00Z",
  },
];

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";
  const icon = type === "success" ? "✓" : type === "error" ? "⚠️" : "ℹ️";

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in flex items-center space-x-2`}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
};

const EcoTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState(mockTips);
  const [filteredTips, setFilteredTips] = useState(mockTips);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [upvotingId, setUpvotingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Form state for adding new tip
  const [newTip, setNewTip] = useState({
    title: "",
    content: "",
    category: "Waste Reduction",
  });

  const categories = [
    "All",
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
    "Sustainable Food",
  ];

  const categoryIcons = {
    "Waste Reduction": <FaTrash className="text-green-600" />,
    "Energy Conservation": <FaLightbulb className="text-yellow-600" />,
    "Water Conservation": <FaWater className="text-blue-600" />,
    "Sustainable Transport": <FaCar className="text-purple-600" />,
    "Green Living": <FaHome className="text-emerald-600" />,
    "Sustainable Food": <FaApple className="text-red-600" />,
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Filter tips based on search and category
  const filterTips = () => {
    let filtered = tips;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tip) => tip.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (tip) =>
          tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tip.authorName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredTips(filtered);
  };

  // Handle search and filter
  useEffect(() => {
    filterTips();
  }, [tips, searchTerm, selectedCategory]);

  const handleUpvote = (tipId) => {
    if (!user) {
      showToast("🌱 Please user to upvote tips!", "info");
      return;
    }

    setUpvotingId(tipId);

    // Simulate API call
    setTimeout(() => {
      setTips(
        tips.map((tip) =>
          tip._id === tipId ? { ...tip, upvotes: tip.upvotes + 1 } : tip,
        ),
      );
      setUpvotingId(null);
      showToast("👍 Thanks for upvoting!", "success");
    }, 500);
  };

  const handleAddTip = (e) => {
    e.preventDefault();

    if (!user) {
      showToast("🌱 Please user to share a tip!", "info");
      return;
    }

    // Validation
    if (!newTip.title.trim()) {
      showToast("Please enter a title for your tip", "error");
      return;
    }

    if (!newTip.content.trim()) {
      showToast("Please share your eco tip content", "error");
      return;
    }

    if (newTip.content.length < 20) {
      showToast("Please provide at least 20 characters for your tip", "error");
      return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newTipObj = {
        _id: Date.now().toString(),
        title: newTip.title,
        content: newTip.content,
        category: newTip.category,
        author: user.email,
        authorName: user.displayName || user.email.split("@")[0],
        authorPhoto: user.photoURL || null,
        upvotes: 0,
        createdAt: new Date().toISOString(),
      };

      setTips([newTipObj, ...tips]);
      setShowAddModal(false);
      setNewTip({ title: "", content: "", category: "Waste Reduction" });
      setSubmitting(false);
      showToast(
        "🎉 Your eco tip has been shared with the community!",
        "success",
      );
    }, 1000);
  };

  const handleShare = (tip) => {
    const shareText = `${tip.title}\n\n${tip.content.substring(0, 150)}...\n\nShared from EcoTrack - Sustainable Living Community\n\nJoin us at: ${window.location.origin}`;

    if (navigator.share) {
      navigator
        .share({
          title: tip.title,
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(shareText);
          showToast("📋 Tip copied to clipboard!", "info");
        });
    } else {
      navigator.clipboard.writeText(shareText);
      showToast("📋 Tip copied to clipboard!", "info");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  // Skeleton Loader Component
  const TipSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );

  // Calculate stats
  const totalUpvotes = tips.reduce((sum, tip) => sum + (tip.upvotes || 0), 0);
  const activeContributors = new Set(tips.map((tip) => tip.author)).size;
  const mostUpvotedTip = [...tips].sort((a, b) => b.upvotes - a.upvotes)[0];

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
            <FaLeaf className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            🌱 Eco Tips & Tricks
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover practical sustainability tips shared by our community.
            Learn, upvote, and share your own eco-friendly ideas!
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{tips.length}</div>
              <div className="text-sm opacity-90 mt-1">Total Tips Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{totalUpvotes}</div>
              <div className="text-sm opacity-90 mt-1">Total Upvotes</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{activeContributors}</div>
              <div className="text-sm opacity-90 mt-1">Active Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                ⭐ {mostUpvotedTip?.upvotes || 0}
              </div>
              <div className="text-sm opacity-90 mt-1">Most Upvoted Tip</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tips by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative md:w-64">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat === "All" ? "all" : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {user && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
              >
                <FaPlus />
                <span>Share Your Tip</span>
              </button>
            )}
          </div>
        </div>

        {/* Tips Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TipSkeleton key={i} />
            ))}
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No tips found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter"
                : "Be the first to share an eco tip!"}
            </p>
            {user && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              >
                Share Your First Tip
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => (
              <div
                key={tip._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {tip.authorPhoto ? (
                          <img
                            src={tip.authorPhoto}
                            alt={tip.authorName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(tip.authorName)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {tip.authorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(tip.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {categoryIcons[tip.category]}
                      <span className="ml-1">{tip.category}</span>
                    </span>
                  </div>

                  {/* Tip Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {tip.content}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleUpvote(tip._id)}
                      disabled={upvotingId === tip._id}
                      className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors disabled:opacity-50 group"
                    >
                      {upvotingId === tip._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaThumbsUp className="group-hover:scale-110 transition-transform" />
                      )}
                      <span className="font-semibold">{tip.upvotes}</span>
                      <span className="text-sm">upvotes</span>
                    </button>

                    <button
                      onClick={() => handleShare(tip)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors group"
                    >
                      <FaShare className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inspiration Quote */}
        {filteredTips.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 text-center">
            <p className="text-green-800 italic">
              "The greatest threat to our planet is the belief that someone else
              will save it." - Robert Swan
            </p>
            <p className="text-sm text-green-600 mt-2">
              Every tip shared brings us one step closer to a sustainable
              future!
            </p>
          </div>
        )}
      </div>

      {/* Add Tip Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Share Your Eco Tip
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Inspire others with your sustainable knowledge
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleAddTip} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tip Title *
                </label>
                <input
                  type="text"
                  value={newTip.title}
                  onChange={(e) =>
                    setNewTip({ ...newTip, title: e.target.value })
                  }
                  placeholder="e.g., How to reduce plastic waste at home"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  maxLength="100"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newTip.title.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newTip.category}
                  onChange={(e) =>
                    setNewTip({ ...newTip, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
                  required
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tip Content *
                </label>
                <textarea
                  value={newTip.content}
                  onChange={(e) =>
                    setNewTip({ ...newTip, content: e.target.value })
                  }
                  rows="6"
                  placeholder="Share your practical eco-friendly tip with the community... (e.g., specific actions, benefits, and how others can implement it)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newTip.content.length} characters (minimum 20)
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-800 flex items-start space-x-2">
                  <span className="text-lg">💡</span>
                  <span>
                    <strong>Pro Tip:</strong> Share actionable advice that
                    others can easily implement. Include specific steps,
                    estimated time, and environmental benefits. Your tip could
                    inspire someone to make a lasting change!
                  </span>
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2 shadow-md"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Sharing...</span>
                    </>
                  ) : (
                    <>
                      <FaLeaf />
                      <span>Share Tip</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
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
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EcoTips;
