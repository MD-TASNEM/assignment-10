import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaUsers, FaClock, FaCalendar, FaMapMarkerAlt, FaArrowLeft, FaShare, FaBookmark } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const ChallengeDetail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Fetch challenge details
    const fetchChallenge = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await challengesAPI.getById(id);
        // setChallenge(response.data);
        
        // Mock data for now
        setChallenge({
          _id: id,
          title: "Plastic-Free July Challenge",
          category: "Waste Reduction",
          description: "Join our month-long challenge to eliminate single-use plastics from your daily life. This challenge focuses on reducing plastic waste by adopting sustainable alternatives and building eco-friendly habits.",
          duration: 30,
          target: "Reduce plastic waste by 50%",
          participants: 1247,
          impactMetric: "kg plastic saved",
          createdBy: "admin@ecotrack.com",
          startDate: "2024-07-01",
          endDate: "2024-07-31",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfb4d4a5a?w=800&h=600&fit=crop",
          difficulty: "Intermediate",
          tags: ["plastic-free", "waste-reduction", "sustainable-living"],
          requirements: [
            "Use reusable bags for shopping",
            "Avoid single-use water bottles",
            "Choose glass or metal containers",
            "Say no to plastic straws",
            "Compost food waste properly"
          ],
          rewards: {
            points: 500,
            badge: "Eco Warrior",
            certificate: true
          }
        });
        
        // Check if user has joined this challenge
        if (user) {
          // TODO: Check user's challenges from API
          // const userChallenges = await userChallengesAPI.getByUser(user.uid);
          // const joined = userChallenges.some(uc => uc.challengeId === id);
          // setIsJoined(joined);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch challenge:", error);
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, user]);

  const handleJoinChallenge = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/challenges/${id}` } });
      return;
    }

    try {
      // TODO: Implement actual API call
      // await userChallengesAPI.join(user.uid, id);
      setIsJoined(true);
      
      // Show success message
      // toast.success("Successfully joined the challenge!");
    } catch (error) {
      console.error("Failed to join challenge:", error);
      // toast.error("Failed to join challenge. Please try again.");
    }
  };

  const handleBookmark = () => {
    if (!user) {
      navigate("/login", { state: { from: `/challenges/${id}` } });
      return;
    }

    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark API
    // await bookmarksAPI.toggle(user.uid, id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: challenge?.title,
        text: challenge?.description,
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-r-2 border-t-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading challenge details...</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Challenge Not Found</h1>
          <p className="text-gray-500 mb-4">The challenge you're looking for doesn't exist.</p>
          <Link
            to="/challenges"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Browse Challenges
          </Link>
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
            <Link
              to="/challenges"
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <FaArrowLeft className="mr-2" />
              Back to Challenges
            </Link>
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Challenge Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {challenge.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleBookmark}
                      className={`p-2 rounded-full transition-colors ${
                        isBookmarked ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <FaBookmark />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <FaShare />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{challenge.duration} days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold">{challenge.participants.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Challenge</h3>
                  <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Target & Impact</h3>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-800 font-medium">{challenge.target}</span>
                      <span className="text-emerald-600 font-bold">{challenge.impactMetric}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="space-y-2">
                    {challenge.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414 1.414l-4-4a1 1 0 00-1.414-1.414L4.586 3H3a1 1 0 00-.707-.293l.293-.293a1 1 0 011.414 1.414l4 4a1 1 0 001.414 1.414l-.293.293a1 1 0 01-1.414 1.414L15.414 17H17a1 1 0 00.707.293l-.293.293a1 1 0 00-1.414-1.414L4.586 13H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Rewards</h3>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-800 font-medium">{challenge.rewards.points} Points</p>
                        <p className="text-sm text-yellow-600">{challenge.rewards.badge} Badge</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-800 font-medium">Certificate</p>
                        <p className="text-sm text-yellow-600">Available</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-200"></div>
                    <div className="ml-8 space-y-4">
                      <div className="relative">
                        <div className="absolute left-0 top-0 w-4 h-4 bg-emerald-600 rounded-full"></div>
                        <div className="ml-8">
                          <p className="font-semibold text-emerald-600">Start: {new Date(challenge.startDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Challenge begins</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-0 top-0 w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="ml-8">
                          <p className="font-semibold text-gray-600">End: {new Date(challenge.endDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Challenge ends</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {!isJoined ? (
                    <button
                      onClick={handleJoinChallenge}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Join Challenge
                    </button>
                  ) : (
                    <div className="flex-1 bg-gray-100 text-gray-500 px-6 py-3 rounded-lg font-medium">
                      ✓ Already Joined
                    </div>
                  )}
                  <Link
                    to="/challenges"
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Browse More Challenges
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Challenge Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-medium">{challenge.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{challenge.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impact</span>
                    <span className="font-medium">{challenge.impactMetric}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Organizer */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizer</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(challenge.createdBy)}&background=10B981&color=fff`}
                    alt="Organizer"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{challenge.createdBy}</p>
                    <p className="text-sm text-gray-500">Challenge Creator</p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Challenge</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <FaShare />
                    Share Challenge
                  </button>
                  <button
                    className="w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
