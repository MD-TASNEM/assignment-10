import React, { useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaLeaf,
  FaExternalLinkAlt,
  FaFilter,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { eventsAPI } from "../api/api";
import { AuthContext } from "../Context/AuthContext";

const EVENT_CATEGORIES = [
  "all",
  "Community Cleanup",
  "Workshop",
  "Webinar",
  "Tree Planting",
  "Conservation",
];

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showVirtualOnly, setShowVirtualOnly] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const { user } = useContext(AuthContext);

    let ignore = false;

    const loadEvents = async () => {
      setLoading(true);

      try {
        const response = await eventsAPI.getUpcoming();
        const liveEvents = Array.isArray(response?.data) ? response.data : [];

        if (ignore) {
          return;
        }

        setEvents(liveEvents);
      } catch (error) {
        if (ignore) {
          return;
        }

        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredEvents = events.filter((event) => {
    if (selectedCategory !== "all") {
      const categoryMatch =
        (selectedCategory === "Community Cleanup" &&
          event.title.toLowerCase().includes("cleanup")) ||
        (selectedCategory === "Workshop" &&
          event.title.toLowerCase().includes("workshop")) ||
        (selectedCategory === "Webinar" &&
          (event.title.toLowerCase().includes("webinar") || event.isVirtual)) ||
        (selectedCategory === "Tree Planting" &&
          event.title.toLowerCase().includes("tree")) ||
        (selectedCategory === "Conservation" &&
          event.title.toLowerCase().includes("conservation"));

      if (!categoryMatch) return false;
    }

    if (showVirtualOnly && !event.isVirtual) {
      return false;
    }

    if (!searchTerm.trim()) {
      return true;
    }

    const query = searchTerm.trim().toLowerCase();
    return (
      String(event.title || "")
        .toLowerCase()
        .includes(query) ||
      String(event.description || "")
        .toLowerCase()
        .includes(query) ||
      String(event.location || "")
        .toLowerCase()
        .includes(query)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-emerald-600 mb-4" />
          <p className="text-lg text-gray-600">
            Loading upcoming green events...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-2xl text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Upcoming Green Events
              </h1>
            </div>
            <Link
              to="/"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                {EVENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Virtual Events Filter */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={showVirtualOnly ? "virtual" : "all"}
                onChange={(e) =>
                  setShowVirtualOnly(e.target.value === "virtual")
                }
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Events</option>
                <option value="virtual">Virtual Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No upcoming events found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all" || showVirtualOnly
                ? "Try adjusting your search or filters."
                : "No upcoming green events scheduled at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={
                      event.imageUrl ||
                      "https://images.unsplash.com/photo-1542601906-6e9b22e77eb?w=600"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {event.isVirtual && (
                    <div className="absolute top-2 right-4 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Virtual
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>
                    {event.isVirtual && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                        Online Event
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span className="font-medium">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FaClock className="mr-2" />
                      <span className="font-medium">
                        {formatTime(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FaMapMarkerAlt className="mr-2" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FaUsers className="mr-2" />
                      <span className="font-medium">
                        {event.currentParticipants || 0} /{" "}
                        {event.maxParticipants || 0} participants
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex space-x-3">
                    <button
                      className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                      onClick={() => {
                        if (!user) {
                          alert("Please login to register for events");
                          return;
                        }
                        // TODO: Add event registration logic
                        alert(
                          `Event registration for "${event.title}" coming soon!`,
                        );
                      }}
                    >
                      Register for Event
                    </button>
                    {event.organizer && (
                      <a
                        href={`mailto:${event.organizer}`}
                        className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Contact Organizer
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
