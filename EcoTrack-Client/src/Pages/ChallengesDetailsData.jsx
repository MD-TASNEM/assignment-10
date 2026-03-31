import { Link } from "react-router-dom";

const ChallengesDetailsData = ({ data }) => {
  // Helper function for rating stars display
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

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      <div className="relative">
        <img
          src={data.image || "https://via.placeholder.com/400x250?text=Service"}
          alt={data.serviceName || data.category}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Optional: Add badge if data has one */}
        {data.badge && (
          <div
            className={`absolute top-4 right-4 ${
              data.badge === "Popular"
                ? "bg-purple-500"
                : data.badge === "Trending"
                  ? "bg-orange-500"
                  : "bg-blue-500"
            } text-white text-xs px-4 py-1.5 rounded-full font-medium`}
          >
            {data.badge}
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
          {data.category}
        </div>

        {/* Optional: Price badge */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-bold">
          ${data.price}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1 line-clamp-1">
            {data.serviceName || data.category}
          </h3>
        </div>

        {/* Description if available */}
        {data.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Rating and Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500 text-xs mb-1">Rating</p>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {renderStars(data.rating || 4.5)}
              </div>
              <span className="text-gray-600 ml-1">({data.rating || 4.5})</span>
            </div>
          </div>

          {data.duration && (
            <div>
              <p className="text-gray-500 text-xs mb-1">Duration</p>
              <p className="font-semibold text-gray-900">{data.duration}</p>
            </div>
          )}

          {data.participants && (
            <div>
              <p className="text-gray-500 text-xs mb-1">Participants</p>
              <p className="font-semibold text-gray-900">
                {data.participants.toLocaleString()}
              </p>
            </div>
          )}

          {data.difficulty && (
            <div>
              <p className="text-gray-500 text-xs mb-1">Difficulty</p>
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full ${
                  data.difficulty === "Easy"
                    ? "text-emerald-600 bg-emerald-100"
                    : data.difficulty === "Medium"
                      ? "text-amber-600 bg-amber-100"
                      : data.difficulty === "Hard"
                        ? "text-red-600 bg-red-100"
                        : "text-gray-600 bg-gray-100"
                }`}
              >
                {data.difficulty}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <Link
            to={`/Challenges/${data.ChallengesId}`}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
          >
            Book Now
          </Link>

          <Link
            to={`/Challenges/${data.ChallengesId}`}
            className="flex-1 border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl text-center font-medium transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengesDetailsData;
