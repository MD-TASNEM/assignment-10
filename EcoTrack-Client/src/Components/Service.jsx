// import { Link } from "react-router"

// const Service = ({ data }) => {
//   if (!data) {
//     return <p className="text-center py-10">Loading...</p>;
//   }

//   const {
//     _id,
//     title,
//     category,
//     shortDescription,
//     duration,
//     participants,
//     impactMetric,
//     totalImpact,
//     difficulty,
//     badge,
//     imageUrl,
//   } = data;

//   const difficultyColor =
//     difficulty === "Easy"
//       ? "text-emerald-600 bg-emerald-100"
//       : difficulty === "Medium"
//       ? "text-amber-600 bg-amber-100"
//       : difficulty === "Hard"
//       ? "text-red-600 bg-red-100"
//       : "text-gray-600 bg-gray-100";

//   const badgeColor =
//     badge === "Popular"
//       ? "bg-purple-500"
//       : badge === "Trending"
//       ? "bg-orange-500"
//       : "bg-blue-500";

//   return (
//     <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
//       <div className="relative">
//         <img
//           src={imageUrl || "https://via.placeholder.com/400x250?text=EcoTrack"}
//           alt={title}
//           className="w-full h-52 object-cover"
//         />

//         {badge && (
//           <div
//             className={`absolute top-4 right-4 ${badgeColor} text-white text-xs px-4 py-1.5 rounded-full`}
//           >
//             {badge}
//           </div>
//         )}

//         <div className="absolute top-4 left-4 bg-white/90 text-gray-700 text-xs px-3 py-1 rounded-full">
//           {category}
//         </div>
//       </div>

//       <div className="p-6 flex flex-col flex-1">
//         <h3 className="text-xl font-bold mb-3">{title}</h3>

//         <p className="text-gray-600 text-sm mb-5 flex-1">{shortDescription}</p>

//         <div className="grid grid-cols-2 gap-4 text-sm mb-6">
//           <div>
//             <p className="text-gray-500">Duration</p>
//             <p className="font-semibold">{duration || 0} Days</p>
//           </div>

//           <div>
//             <p className="text-gray-500">Participants</p>
//             <p className="font-semibold">{participants?.toLocaleString() || 0}</p>
//           </div>

//           <div>
//             <p className="text-gray-500">Impact</p>
//             <p className="text-emerald-600 font-semibold">
//               {totalImpact || 0} {impactMetric || ""}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500">Difficulty</p>
//             <span className={`px-3 py-1 text-xs rounded-full ${difficultyColor}`}>
//               {difficulty || "Unknown"}
//             </span>
//           </div>
//         </div>




//              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
//                 <Link
//                   to={`/Challenges/${_id}`}
//                   className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
//                 >
//                   Join Challenge
//                 </Link>

//                 <Link
//                   to={`/Challenges/${_id}`}
//                   className="flex-1 border-2 border-gray-200 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl text-center font-medium transition-all duration-300"
//                 >
//                   View Details
//                 </Link>
//               </div>
//       </div>
//     </div>
//   );
// };

// export default Service;




import { Link } from "react-router";

const Service = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-md p-6 text-center">
        <p className="text-gray-500">Loading service data...</p>
      </div>
    );
  }

  const {
    _id,
    ChallengesId, // Add this to handle both ID formats
    title,
    serviceName, // Add this to handle both title formats
    category,
    shortDescription,
    description, // Add this to handle both description formats
    duration,
    participants,
    impactMetric,
    totalImpact,
    difficulty,
    badge,
    imageUrl,
    image, // Add this to handle both image formats
    rating, // Add rating if needed
    price, // Add price if needed
  } = data;

  // Use either _id or ChallengesId for the link
  const serviceId = _id || ChallengesId;

  // Use either title or serviceName for display
  const displayTitle = title || serviceName || "Challenge";

  // Use either shortDescription or description
  const displayDescription = shortDescription || description || "Join this eco-friendly challenge and make a difference!";

  // Use either imageUrl or image
  const displayImage = imageUrl || image || "https://via.placeholder.com/400x250?text=EcoTrack";

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
      : badge === "New"
      ? "bg-blue-500"
      : "bg-gray-500";

  // Helper function for rating stars display (if rating exists)
  const renderStars = (rating) => {
    if (!rating) return null;

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
      <div className="relative overflow-hidden">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {badge && (
          <div
            className={`absolute top-4 right-4 ${badgeColor} text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg`}
          >
            {badge}
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
          {category}
        </div>

        {/* Price badge if price exists */}
        {price && (
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-bold">
            ${price}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1 line-clamp-1">
            {displayTitle}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-1">
          {displayDescription}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          {/* Rating if available */}
          {rating && (
            <div>
              <p className="text-gray-500 text-xs mb-1">Rating</p>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {renderStars(rating)}
                </div>
                <span className="text-gray-600 ml-1">({rating})</span>
              </div>
            </div>
          )}

          <div>
            <p className="text-gray-500 text-xs mb-1">Duration</p>
            <p className="font-semibold text-gray-900">
              {duration || 0} {duration === 1 ? "Day" : "Days"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs mb-1">Participants</p>
            <p className="font-semibold text-gray-900">
              {participants?.toLocaleString() || 0}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs mb-1">Impact</p>
            <p className="text-emerald-600 font-semibold">
              {totalImpact || 0} {impactMetric || ""}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs mb-1">Difficulty</p>
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full ${difficultyColor}`}
            >
              {difficulty || "Unknown"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <Link
            to={`/Challenges/${serviceId}`}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-center font-medium transition-colors duration-300"
          >
            Join Challenge
          </Link>

          <Link
            to={`/Challenges/${serviceId}`}
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