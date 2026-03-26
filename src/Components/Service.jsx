import { Link } from "react-router"

const Service = ({ data }) => {
  if (!data) {
    return <p className="text-center py-10">Loading...</p>;
  }

  const {
    _id,
    title,
    category,
    shortDescription,
    duration,
    participants,
    impactMetric,
    totalImpact,
    difficulty,
    badge,
    imageUrl,
  } = data;

  const difficultyColor =
    difficulty === "Easy"
      ? "text-emerald-600 bg-emerald-100"
      : difficulty === "Medium"
      ? "text-amber-600 bg-amber-100"
      : difficulty === "Hard"
      ? "text-red-600 bg-red-100"
      : "text-gray-600 bg-gray-100";

  const badgeColor =
    badge === "Popular"
      ? "bg-purple-500"
      : badge === "Trending"
      ? "bg-orange-500"
      : "bg-blue-500";

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      <div className="relative">
        <img
          src={imageUrl || "https://via.placeholder.com/400x250?text=EcoTrack"}
          alt={title}
          className="w-full h-52 object-cover"
        />

        {badge && (
          <div
            className={`absolute top-4 right-4 ${badgeColor} text-white text-xs px-4 py-1.5 rounded-full`}
          >
            {badge}
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/90 text-gray-700 text-xs px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>

        <p className="text-gray-600 text-sm mb-5 flex-1">{shortDescription}</p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-semibold">{duration || 0} Days</p>
          </div>

          <div>
            <p className="text-gray-500">Participants</p>
            <p className="font-semibold">{participants?.toLocaleString() || 0}</p>
          </div>

          <div>
            <p className="text-gray-500">Impact</p>
            <p className="text-emerald-600 font-semibold">
              {totalImpact || 0} {impactMetric || ""}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Difficulty</p>
            <span className={`px-3 py-1 text-xs rounded-full ${difficultyColor}`}>
              {difficulty || "Unknown"}
            </span>
          </div>
        </div>




             <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                <Link
                  to={`/challenges/${_id}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
                >
                  Join Challenge
                </Link>

                <Link
                  to={`/challenges/${_id}`}
                  className="flex-1 border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl text-center font-medium transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
      </div>
    </div>
  );
};

export default Service;