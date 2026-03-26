import { useState, useEffect } from "react";
import { Link } from "react-router";

const Challenges = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading data:", err));
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

      {/* Filter Buttons - Styled like tabs */}
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
            key={service._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
          >
            <div className="relative">
              <img
                src={
                  service.imageUrl ||
                  "https://via.placeholder.com/400x250?text=EcoTrack"
                }
                alt={service.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {service.badge && (
                <div
                  className={`absolute top-4 right-4 ${getBadgeColor(
                    service.badge,
                  )} text-white text-xs px-4 py-1.5 rounded-full font-medium`}
                >
                  {service.badge}
                </div>
              )}

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                {service.category}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-1">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm mb-5 flex-1 line-clamp-2">
                {service.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">
                    {service.duration || 0} Days
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-1">Participants</p>
                  <p className="font-semibold text-gray-900">
                    {service.participants?.toLocaleString() || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs mb-1">Impact</p>
                  <p className="text-emerald-600 font-semibold">
                    {service.totalImpact || 0} {service.impactMetric || ""}
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
                  to={`/Challenges/${service._id}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
                >
                  Join Challenge
                </Link>

                <Link
                  to={`/Challenges/${service._id}`}
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
          <p className="text-gray-500 text-lg">
            No Challenges found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Challenges;
