import React, { useContext } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  FaLeaf,
  FaUser,
  FaSignOutAlt,
  FaChartLine,
  FaTrophy,
  FaCog,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const ProtectedLayout = ({ children }) => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-2xl text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">EcoTrack</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveLink("/") ? "bg-emerald-50 text-emerald-600" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/challenges"
                className={`text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveLink("/challenges")
                    ? "bg-emerald-50 text-emerald-600"
                    : ""
                }`}
              >
                Challenges
              </Link>
              <Link
                to="/my-activities"
                className={`text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveLink("/my-activities")
                    ? "bg-emerald-50 text-emerald-600"
                    : ""
                }`}
              >
                My Activities
              </Link>
            </nav>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=10B981&color=fff`
                  }
                  alt={user.displayName || "User"}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <Link
                  to="/my-activities"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <FaChartLine className="mr-2" />
                  My Activities
                </Link>
                <Link
                  to="/achievements"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <FaTrophy className="mr-2" />
                  Achievements
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <FaCog className="mr-2" />
                  Settings
                </Link>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={() => {
                    // Handle logout
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-left"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-center text-sm text-gray-500">
                © 2025 EcoTrack
              </p>
            </div>
            <div className="flex justify-center space-x-6 mb-4 md:mb-0">
              <a
                href="/about"
                className="text-gray-500 hover:text-emerald-600 text-sm transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-500 hover:text-emerald-600 text-sm transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex justify-center space-x-4 mb-4 md:mb-0">
              {/* Social Media Icons */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-600 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.828-2.828 10 0 01-2.828 2.828c-1.735 0-3.262.274-1.735h-1.455v-2.828h1.455c1.735 0 3.262-.274 1.735h-1.455v-2.828h1.455c1.735 0 3.262.274 1.735h1.455z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-600 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-5.373 12-12 5.373 12 12 5.373 12 12zm0 1.841c-4.417 0-8 3.583-8 8 8 8 3.583 8 8zm0 4.865c0 4.417-3.583 8-8 8-8 8 3.583 8 8zm0 1.841c0 4.417-3.583 8-8 8-8 8-3.583 8-8zm0 1.841c0 4.417 3.583 8 8 8 8 3.583 8 8zm0 4.865c0 4.417-3.583 8-8 8-8 8-3.583 8-8z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <p className="text-xs text-gray-400">
              Small accessibility and privacy note
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProtectedLayout;
