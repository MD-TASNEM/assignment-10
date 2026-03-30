import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { challengesAPI } from "../api/api";
import toast from "react-hot-toast";
import { getChallengeId, hasChallengeId } from "../utils/challengeIdentity";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const requestState = { cancelled: false };
    fetchChallenges(requestState);

    return () => {
      requestState.cancelled = true;
    };
  }, []);

  const fetchChallenges = async (requestState) => {
    setLoading(true);
    try {
      const response = await challengesAPI.getAll();
      if (requestState.cancelled) {
        return;
      }

      const serverChallenges = Array.isArray(response.data)
        ? response.data
        : [];
      setChallenges(serverChallenges);
      setFilteredChallenges(serverChallenges);
      setCategories([
        ...new Set(serverChallenges.map((challenge) => challenge.category)),
      ]);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      if (!requestState.cancelled) {
        setChallenges([]);
        setFilteredChallenges([]);
        setCategories([]);
        toast.error("Failed to load challenges from server");
      }
    } finally {
      if (!requestState.cancelled) {
        setLoading(false);
      }
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...challenges];

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((c) => c.category === filters.category);
    }

    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower),
      );
    }

    setFilteredChallenges(filtered);
  }, [challenges, filters]);

  useEffect(() => {
    applyFilters();
  }, [filters, challenges, applyFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: "", status: "", search: "" });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 bg-emerald-100";
      case "Medium":
        return "text-amber-600 bg-amber-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading challenges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          All Challenges
        </h1>
        <p className="text-gray-600">
          Join our eco-friendly challenges and make a difference
        </p>
        <div className="mt-6">
          <Link
            to="/challenges/add"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Add New Challenge
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search challenges..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={resetFilters}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChallenges.map((challenge, index) => {
          const challengeId = getChallengeId(challenge);

          return (
            <div
              key={challengeId || `${challenge.title}-${index}`}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    challenge.imageUrl ||
                    "https://via.placeholder.com/400x250?text=EcoTrack"
                  }
                  alt={challenge.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}
                >
                  {challenge.status}
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                  {challenge.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-1">
                  {challenge.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Duration</p>
                    <p className="font-semibold">{challenge.duration} Days</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Participants</p>
                    <p className="font-semibold">
                      {challenge.participants?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Impact</p>
                    <p className="text-emerald-600 font-semibold">
                      {challenge.impactMetric || "kg CO₂"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Difficulty</p>
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full ${getDifficultyColor(challenge.difficulty || "Medium")}`}
                    >
                      {challenge.difficulty || "Medium"}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    {hasChallengeId(challenge) ? (
                      <Link
                        to={`/challenges/join/${challengeId}`}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
                      >
                        Join Challenge
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          toast.error(
                            "This challenge cannot be opened because its id is missing.",
                          )
                        }
                        className="flex-1 rounded-xl bg-slate-200 py-3 text-center font-medium text-slate-600"
                      >
                        Join Challenge
                      </button>
                    )}
                    {hasChallengeId(challenge) ? (
                      <Link
                        to={`/challenges/${challengeId}`}
                        className="flex-1 border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl text-center font-medium transition-all duration-300"
                      >
                        View Details
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          toast.error(
                            "This challenge cannot be opened because its id is missing.",
                          )
                        }
                        className="flex-1 rounded-xl border-2 border-slate-200 py-3 text-center font-medium text-slate-500"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-500 text-lg mb-2">No challenges found.</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your filters or check back later for new challenges.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
