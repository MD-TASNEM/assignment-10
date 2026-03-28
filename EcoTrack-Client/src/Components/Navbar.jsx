import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext"; // Make sure this path is correct
import toast from "react-hot-toast";
import {
  FaLeaf,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTrophy,
  FaCalendarAlt,
  FaLightbulb,
  FaSpinner,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      toast.success("Logged out successfully. Come back soon! 🌱", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
          borderRadius: "12px",
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to logout. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <FaLeaf className="mr-2" /> },
    {
      path: "/challenges",
      label: "Challenges",
      icon: <FaTrophy className="mr-2" />,
    },
    {
      path: "/my-activities",
      label: "My Activities",
      icon: <FaCalendarAlt className="mr-2" />,
      protected: true,
    },
    {
      path: "/EcoTips",
      label: "Eco Tips",
      icon: <FaLightbulb className="mr-2" />,
    },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo/Brand */}
            <NavLink
              to="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaLeaf className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
                  EcoTrack
                </h2>
                <span className="text-xs text-emerald-300 hidden md:block">
                  Sustainable Living Community
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                if (link.protected && !user) return null;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-lg scale-105"
                          : "text-gray-200 hover:text-white hover:bg-green-700/50"
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                );
              })}

              {/* User Section */}
              <div className="ml-4 pl-4 border-l border-green-600">
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-3 bg-green-800/50 rounded-full pl-2 pr-4 py-1.5 hover:bg-green-700 transition-all duration-300 cursor-pointer border border-green-600">
                      <img
                        className="h-9 w-9 rounded-full ring-2 ring-emerald-400 object-cover"
                        src={user.photoURL || "https://via.placeholder.com/40"}
                        alt={user.displayName || user.name || "User"}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />
                      <div className="hidden lg:block">
                        <p className="text-sm font-medium max-w-32 truncate">
                          {user.displayName || user.name || "Eco Warrior"}
                        </p>
                        <p className="text-xs text-emerald-300">
                          🌱 Green Member
                        </p>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.displayName || user.name || "Eco Warrior"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            🌿 0 Challenges
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                            🏆 0 badges
                          </span>
                        </div>
                      </div>

                      <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaUser className="mr-3 text-gray-400" />
                        My Profile
                      </NavLink>

                      <NavLink
                        to="/my-activities"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaCalendarAlt className="mr-3 text-gray-400" />
                        My Activities
                      </NavLink>
                      <NavLink
                        to="/Leaderboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span className="mr-3">🏆</span>
                        Leaderboard
                      </NavLink>

                      <button
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? (
                          <>
                            <FaSpinner className="animate-spin mr-3" />
                            Logging out...
                          </>
                        ) : (
                          <>
                            <FaSignOutAlt className="mr-3 text-red-400" />
                            Sign Out
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <NavLink
                      to="/login"
                      className="px-5 py-2 rounded-full font-medium text-emerald-300 border border-emerald-500 hover:bg-emerald-600/20 transition-all duration-300"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-2xl hover:text-emerald-300 transition-colors duration-200 p-2 rounded-lg hover:bg-green-800/50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-green-900 to-green-950 shadow-2xl animate-slide-in overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-green-700">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-2 rounded-xl">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">EcoTrack</h2>
                  <p className="text-xs text-emerald-300">Sustainable Living</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-emerald-300 transition-colors p-2"
                aria-label="Close menu"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6">
              {user && (
                <div className="mb-6 p-4 bg-green-800/30 rounded-xl border border-green-700">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-12 w-12 rounded-full ring-2 ring-emerald-400 object-cover"
                      src={user.photoURL || "https://via.placeholder.com/48"}
                      alt={user.displayName || user.name || "User"}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48";
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white truncate">
                        {user.displayName || user.name || "Eco Warrior"}
                      </p>
                      <p className="text-xs text-emerald-300 truncate">
                        {user.email}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-700 text-green-200">
                          🌿 0
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-700 text-emerald-200">
                          🏆 0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <ul className="space-y-2">
                {navLinks.map((link) => {
                  if (link.protected && !user) return null;

                  return (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-emerald-600 text-white shadow-lg"
                              : "text-gray-200 hover:bg-green-800 hover:text-white"
                          }`
                        }
                      >
                        <span className="mr-3">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 pt-6 border-t border-green-700">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Logging out...</span>
                      </>
                    ) : (
                      <>
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <NavLink
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 bg-transparent text-emerald-300 border-2 border-emerald-500 px-4 py-3 rounded-lg font-medium hover:bg-emerald-600 hover:text-white transition-all duration-200"
                    >
                      <FaUser />
                      <span>Login</span>
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg"
                    >
                      <FaLeaf />
                      <span>Join EcoTrack</span>
                    </NavLink>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-green-800/20 rounded-lg text-center">
                <p className="text-xs text-emerald-300 italic">
                  "Every small action counts towards a greener future 🌍"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
