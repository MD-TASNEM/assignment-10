import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getChallengeId, hasChallengeId } from "../utils/challengeIdentity";

// Category to color mapping for placeholder backgrounds
const categoryColorMap = {
  "Waste Reduction": "bg-red-100",
  "Energy Conservation": "bg-yellow-100",
  "Water Conservation": "bg-blue-100",
  "Sustainable Transport": "bg-green-100",
  "Green Living": "bg-emerald-100",
  "Food & Diet": "bg-orange-100",
};

// Category to emoji mapping for better placeholders
const categoryEmojiMap = {
  "Waste Reduction": "♻️",
  "Energy Conservation": "⚡",
  "Water Conservation": "💧",
  "Sustainable Transport": "🚴",
  "Green Living": "🌱",
  "Food & Diet": "🍎",
};

const getPlaceholderImage = (category, title) => {
  // Use UI Avatars to generate a nice placeholder with emoji or text
  const emoji = categoryEmojiMap[category] || "🌍";
  const text = category || "EcoTrack";
  const color =
    categoryColorMap[category]?.replace("bg-", "").replace("-100", "") ||
    "green";
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%23${getColorHex(color)}'  width='400' height='250'/%3E%3Ctext x='50%25' y='50%25' font-size='80' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3E${emoji}%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='24' fill='white' text-anchor='middle' font-family='Arial'%3E${text}%3C/text%3E%3C/svg%3E`;
};

const getColorHex = (color) => {
  const colorMap = {
    red: "EF4444",
    yellow: "FBBF24",
    blue: "3B82F6",
    green: "22C55E",
    emerald: "10B981",
    orange: "F97316",
  };
  return colorMap[color] || "10B981";
};

const Service = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-md p-6 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const {
    title,
    category,
    description,
    duration,
    participants,
    impactMetric,
    difficulty,
    status,
    imageUrl,
  } = data;
  const challengeId = getChallengeId(data);

  const difficultyColor =
    {
      Easy: "text-emerald-600 bg-emerald-100",
      Medium: "text-amber-600 bg-amber-100",
      Hard: "text-red-600 bg-red-100",
    }[difficulty] || "text-gray-600 bg-gray-100";

  const statusColor =
    {
      Active: "bg-green-500",
      Upcoming: "bg-blue-500",
      Completed: "bg-gray-500",
    }[status] || "bg-gray-500";

  const displayImage = imageUrl || getPlaceholderImage(category, title);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100"
          onError={(e) => {
            e.target.src = getPlaceholderImage(category, title);
          }}
        />
        <div
          className={`absolute top-4 right-4 ${statusColor} text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg`}
        >
          {status}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-1">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-gray-500 text-xs mb-1">Duration</p>
            <p className="font-semibold text-gray-900">{duration || 0} Days</p>
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
              {impactMetric || "kg CO₂"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Difficulty</p>
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full ${difficultyColor}`}
            >
              {difficulty || "Medium"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          {hasChallengeId(data) ? (
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
          {hasChallengeId(data) ? (
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
  );
};

export default Service;
