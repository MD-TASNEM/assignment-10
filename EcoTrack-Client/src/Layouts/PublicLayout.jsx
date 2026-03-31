import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaLeaf,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const PublicLayout = ({ children }) => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;

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
              {user && (
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
              )}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
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
                  {isMobileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/my-activities"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaChartLine className="mr-2" />
                        My Activities
                      </Link>
                      <button
                        onClick={() => {
                          // Handle logout
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-left"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-emerald-600 p-2 rounded-md transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveLink("/")
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/challenges"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveLink("/challenges")
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Challenges
                </Link>
                {user && (
                  <Link
                    to="/my-activities"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActiveLink("/my-activities")
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-700 hover:text-emerald-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Activities
                  </Link>
                )}

                {/* Mobile Auth */}
                {!user && (
                  <div className="pt-4 border-t border-gray-200 mt-2">
                    <button
                      onClick={() => {
                        // Handle logout
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-left"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

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
              {/* Social Media Icons - Optional */}
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
                  <path d="M23.953 4.57a10 10 0 01-2.828-2.828 10 0 01-2.828 2.828c-1.735 0-3.262.274-1.735h-1.455v-2.828h1.455c1.735 0 3.262-.274 1.735h-1.455v2.828h1.455c1.735 0 3.262.274 1.735h1.455v-2.828h-1.455c-1.735 0-3.262-.274-1.735h1.455z" />
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
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-5.373 12-12 5.373 12 12 5.373 12 12zm0 1.841c-4.417 0-8 3.583-8 8 8 8 3.583 8 8zm0 4.865c0 4.417-3.583 8-8 8-8 8-3.583 8-8zm0 1.841c0 4.417 3.583 8 8 8 8 3.583 8 8zm0 4.865c0 4.417-3.583 8-8 8-8 8-3.583 8-8z" />
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

export default PublicLayout;
