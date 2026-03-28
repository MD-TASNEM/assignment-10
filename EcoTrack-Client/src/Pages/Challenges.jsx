import { useState, useEffect } from "react";
import { Link } from "react-router";

const Challenges = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch challenges data");
        }
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredServices =
    filter === "All"
      ? services
      : services.filter((service) => service.badge === filter);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Popular":
        return "bg-purple-500";
      case "Trending":
        return "bg-orange-500";
      case "New":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`star-${i}`} className="fas fa-star text-amber-400"></i>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half-star" className="fas fa-star-half-alt text-amber-400"></i>,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-amber-400"></i>,
      );
    }

    return stars;
  };

  const getDurationText = (duration, unit) => {
    if (!duration) return "0 Days";
    if (unit) return `${duration} ${unit}`;
    return `${duration} ${duration === 1 ? "Day" : "Days"}`;
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

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 text-lg mb-4">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
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
          Join our eco-friendly Challenges and make a difference
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {["All", "Popular", "Trending", "New"].map((b) => (
          <button
            key={b}
            onClick={() => setFilter(b)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === b
                ? "bg-emerald-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.ChallengesId || service._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
          >
            <div className="relative overflow-hidden">
              <img
                src={
                  service.imageUrl ||
                  service.image ||
                  "https://via.placeholder.com/400x250?text=EcoTrack"
                }
                alt={service.title || service.serviceName}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {service.badge && (
                <div
                  className={`absolute top-4 right-4 ${getBadgeColor(
                    service.badge,
                  )} text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg`}
                >
                  {service.badge}
                </div>
              )}

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                {service.category}
              </div>

              {service.price && (
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-bold">
                  ${service.price}
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-1">
                {service.title || service.serviceName}
              </h3>

              <p className="text-gray-600 text-sm mb-5 flex-1 line-clamp-2">
                {service.shortDescription || service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {renderStars(service.rating || 4.5)}
                    </div>
                    <span className="text-gray-600 ml-1">
                      ({service.rating || 4.5})
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">
                    {getDurationText(service.duration, service.durationUnit)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-1">Participants</p>
                  <p className="font-semibold text-gray-900">
                    {service.participants?.toLocaleString() || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-1">Difficulty</p>
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${getDifficultyColor(
                      service.difficulty,
                    )}`}
                  >
                    {service.difficulty || "Unknown"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                <Link
                  to={`/Challenges/${service.ChallengesId || service._id}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
                >
                  Join Challenge
                </Link>

                <Link
                  to={`/Challenges/${service.ChallengesId || service._id}`}
                  className="flex-1 border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl text-center font-medium transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-500 text-lg mb-2">
              No Challenges found in this category.
            </p>
            <p className="text-gray-400 text-sm">
              Try selecting a different filter or check back later for new
              challenges.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
