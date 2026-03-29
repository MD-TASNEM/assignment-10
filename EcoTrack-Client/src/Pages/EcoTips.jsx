import React, { useContext, useEffect, useState } from "react";
import {
  FaApple,
  FaCar,
  FaFilter,
  FaHome,
  FaLeaf,
  FaLightbulb,
  FaPlus,
  FaRecycle,
  FaSearch,
  FaShare,
  FaSpinner,
  FaThumbsUp,
  FaTimes,
  FaWater,
} from "react-icons/fa";
import { tipsAPI } from "../api/api";
import { AuthContext } from "../Context/AuthContext";

const TIP_CATEGORIES = [
  "Waste Management",
  "Energy Saving",
  "Water Conservation",
  "Sustainable Transport",
  "Green Living",
  "Food & Diet",
];

const DEFAULT_CATEGORY = TIP_CATEGORIES[0];

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

  const icon = type === "success" ? "OK" : type === "error" ? "!" : "i";

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in flex items-center space-x-2`}
    >
      <span className="font-semibold">{icon}</span>
      <span>{message}</span>
    </div>
  );
};

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

const categoryIcons = {
  "Waste Management": <FaRecycle className="text-green-600" />,
  "Energy Saving": <FaLightbulb className="text-yellow-600" />,
  "Water Conservation": <FaWater className="text-blue-600" />,
  "Sustainable Transport": <FaCar className="text-purple-600" />,
  "Green Living": <FaHome className="text-emerald-600" />,
  "Food & Diet": <FaApple className="text-red-600" />,
};

const getApiErrorMessage = (error, fallbackMessage) => {
  const responseMessage = error?.response?.data?.message;

  if (responseMessage === "Not authorized, no token") {
    return "This action needs a backend auth token. Tip listing is live, but posting and voting are still protected.";
  }

  if (responseMessage === "Not authorized, token failed") {
    return "Your backend auth token was rejected. Please sign in again and retry.";
  }

  return responseMessage || fallbackMessage;
};

const EcoTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [upvotingId, setUpvotingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [apiError, setApiError] = useState("");
  const [newTip, setNewTip] = useState({
    title: "",
    content: "",
    category: DEFAULT_CATEGORY,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    let ignore = false;

    const loadTips = async () => {
      setLoading(true);

      try {
        const response = await tipsAPI.getAll();
        const liveTips = Array.isArray(response?.data) ? response.data : [];

        if (ignore) {
          return;
        }

        setTips(liveTips);
        setApiError("");
      } catch (error) {
        if (ignore) {
          return;
        }

        console.error("Failed to load tips:", error);
        setTips([]);
        setApiError(
          getApiErrorMessage(
            error,
            "Unable to load live tips from the server right now.",
          ),
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadTips();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTips = tips.filter((tip) => {
    if (selectedCategory !== "all" && tip.category !== selectedCategory) {
      return false;
    }

    if (!searchTerm.trim()) {
      return true;
    }

    const query = searchTerm.trim().toLowerCase();
    const authorName =
      tip.authorName || tip.author?.split("@")[0] || "EcoTrack User";

    return (
      String(tip.title || "")
        .toLowerCase()
        .includes(query) ||
      String(tip.content || "")
        .toLowerCase()
        .includes(query) ||
      authorName.toLowerCase().includes(query)
    );
  });

  const handleUpvote = async (tipId) => {
    if (!user) {
      showToast("Please sign in to upvote tips.", "info");
      return;
    }

    setUpvotingId(tipId);

    try {
      const response = await tipsAPI.upvote(tipId);
      const updatedTip = response?.data?.tip;
      const updatedUpvotes = Number(
        response?.data?.upvotes ?? updatedTip?.upvotes ?? 0,
      );

      setTips((currentTips) =>
        currentTips.map((tip) =>
          tip._id === tipId
            ? {
                ...tip,
                ...(updatedTip || {}),
                upvotes: updatedUpvotes,
              }
            : tip,
        ),
      );
      showToast("Thanks for upvoting!", "success");
    } catch (error) {
      console.error("Failed to upvote tip:", error);
      showToast(
        getApiErrorMessage(error, "Unable to upvote this tip right now."),
        "error",
      );
    } finally {
      setUpvotingId(null);
    }
  };

  const handleAddTip = async (event) => {
    event.preventDefault();

    if (!user) {
      showToast("Please sign in to share a tip.", "info");
      return;
    }

    if (!newTip.title.trim()) {
      showToast("Please enter a title for your tip.", "error");
      return;
    }

    if (!newTip.content.trim()) {
      showToast("Please share your eco tip content.", "error");
      return;
    }

    if (newTip.content.trim().length < 20) {
      showToast("Please provide at least 20 characters for your tip.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: newTip.title.trim(),
        content: newTip.content.trim(),
        category: newTip.category,
        authorPhoto: user.photoURL || null,
      };
      const response = await tipsAPI.create(payload);
      const createdTip = response?.data;

      if (!createdTip?._id) {
        throw new Error("Tip was created, but the response was incomplete.");
      }

      setTips((currentTips) => [createdTip, ...currentTips]);
      setShowAddModal(false);
      setNewTip({
        title: "",
        content: "",
        category: DEFAULT_CATEGORY,
      });
      showToast("Your eco tip has been shared with the community!", "success");
    } catch (error) {
      console.error("Failed to create tip:", error);
      showToast(
        getApiErrorMessage(error, "Unable to share your tip right now."),
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async (tip) => {
    const shareText = `${tip.title}\n\n${String(tip.content || "").substring(0, 150)}...\n\nShared from EcoTrack - Sustainable Living Community\n\nJoin us at: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: tip.title,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fall back to clipboard below.
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      showToast("Tip copied to clipboard.", "info");
    } catch {
      showToast("Sharing is not available on this device.", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return "Today";
    }

    if (diffDays === 1) {
      return "Yesterday";
    }

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    }

    return date.toLocaleDateString();
  };

  const getAuthorName = (tip) =>
    tip.authorName || tip.author?.split("@")[0] || "EcoTrack User";

  const getInitials = (name) =>
    String(name || "E")
      .trim()
      .charAt(0)
      .toUpperCase();

  const totalUpvotes = tips.reduce(
    (sum, tip) => sum + Number(tip.upvotes || 0),
    0,
  );
  const activeContributors = new Set(
    tips.map((tip) => tip.author || getAuthorName(tip)),
  ).size;
  const mostUpvotedTip = tips.length
    ? [...tips].sort(
        (firstTip, secondTip) =>
          Number(secondTip.upvotes || 0) - Number(firstTip.upvotes || 0),
      )[0]
    : null;

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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaLeaf className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Eco Tips & Tricks
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover practical sustainability tips shared by the community and
            loaded from your live database.
          </p>
        </div>

        {apiError && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900 shadow-sm">
            <p className="font-semibold">Live tip feed unavailable</p>
            <p className="text-sm mt-1">{apiError}</p>
          </div>
        )}

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
                {mostUpvotedTip ? mostUpvotedTip.upvotes || 0 : 0}
              </div>
              <div className="text-sm opacity-90 mt-1">Most Upvoted Tip</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tips by title, content, or author..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative md:w-64">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All</option>
                {TIP_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <TipSkeleton key={item} />
            ))}
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">...</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No tips found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter."
                : "No live tips were returned from the database yet."}
            </p>
            {user && !apiError && (
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
            {filteredTips.map((tip) => {
              const authorName = getAuthorName(tip);

              return (
                <div
                  key={tip._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
                >
                  {tip.imageUrl && (
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {tip.authorPhoto ? (
                            <img
                              src={tip.authorPhoto}
                              alt={authorName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            getInitials(authorName)
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {authorName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(tip.createdAt)}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {categoryIcons[tip.category] || (
                          <FaLeaf className="text-green-600" />
                        )}
                        <span className="ml-1">{tip.category || "General"}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {tip.content}
                    </p>

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
                        <span className="font-semibold">
                          {Number(tip.upvotes || 0)}
                        </span>
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
              );
            })}
          </div>
        )}

        {filteredTips.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 text-center">
            <p className="text-green-800 italic">
              "The greatest threat to our planet is the belief that someone else
              will save it." - Robert Swan
            </p>
            <p className="text-sm text-green-600 mt-2">
              Every live tip shared brings the community one step closer to a
              sustainable future.
            </p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Share Your Eco Tip
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Inspire others with something practical they can do today.
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
                  onChange={(event) =>
                    setNewTip((currentTip) => ({
                      ...currentTip,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g., Start a simple compost system at home"
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
                  onChange={(event) =>
                    setNewTip((currentTip) => ({
                      ...currentTip,
                      category: event.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
                  required
                >
                  {TIP_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  onChange={(event) =>
                    setNewTip((currentTip) => ({
                      ...currentTip,
                      content: event.target.value,
                    }))
                  }
                  rows="6"
                  placeholder="Share the steps, the benefit, and anything that helps others repeat it."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newTip.content.length} characters (minimum 20)
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-800">
                  Share actionable advice with clear steps and a practical
                  environmental benefit so other people can try it easily.
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

      <style>{`
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
