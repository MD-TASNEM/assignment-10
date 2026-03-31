import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaChartLine,
  FaHome,
  FaLeaf,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Layout = ({ children, isPublic = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/");
      setProfileDropdownOpen(false);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navLinks = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/challenges", label: "Challenges", icon: FaLeaf },
    ...(user
      ? [{ to: "/my-activities", label: "My Activities", icon: FaChartLine }]
      : []),
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <FaLeaf className="text-emerald-600 text-2xl" />
                <span className="text-xl font-bold text-gray-900">
                  EcoTrack
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveLink(link.to)
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <span className="hidden lg:block">
                      {user.displayName || user.email}
                    </span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaUser className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/my-activities"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaChartLine className="mr-2" />
                        My Activities
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                    className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActiveLink(link.to)
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="text-lg" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {!isPublic && (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-sm text-gray-700">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                              <FaUser className="text-white text-xs" />
                            </div>
                            <span>{user.displayName || user.email}</span>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FaUser className="text-sm" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/my-activities"
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FaChartLine className="text-sm" />
                          <span>My Activities</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          <FaSignOutAlt className="text-sm" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-3 py-2 text-base font-medium text-emerald-600 hover:text-emerald-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-3 py-2 text-base font-medium text-emerald-600 hover:text-emerald-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaLeaf className="text-emerald-400 text-xl" />
                <span className="text-lg font-bold">EcoTrack</span>
              </div>
              <p className="text-gray-400 text-sm">
                Building a sustainable future through community-driven
                environmental challenges and actions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/ecotrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/ecotrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/ecotrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069 3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07zM12 5.838c-3.403 0-3.674.015-4.835.07-1.617.073-2.496.336-3.078.56-.775.301-1.33.66-1.905 1.235-.575.575-.934 1.13-1.235 1.905-.224.582-.487 1.461-.56 3.078-.055 1.161-.07 1.432-.07 4.835 0 3.403.015 3.674.07 4.835.073 1.617.336 2.496.56 3.078.301.775.66 1.33 1.235 1.905.575.575 1.13.934 1.905 1.235.582.224 1.461.487 3.078.56 1.161.055 1.432.07 4.835.07 3.403 0 3.674-.015 4.835-.07 1.617-.073 2.496-.336 3.078-.56.775-.301 1.33-.66 1.905-1.235.575-.575.934-1.13 1.235-1.905.224-.582.487-1.461.56-3.078.055-1.161.07-1.432.07-4.835 0-3.403-.015-3.674-.07-4.835-.073-1.617-.336-2.496-.56-3.078-.301-.775-.66-1.33-1.235-1.905-.575-.575-1.13-.934-1.905-1.235-.582-.224-1.461-.487-3.078-.56-1.161-.055-1.432-.07-4.835-.07zm0 2.163c3.351 0 3.741.014 4.891.069 1.481.067 2.285.312 2.822.519.711.276 1.218.603 1.712 1.097.494.494.821 1.001 1.097 1.712.207.537.452 1.341.519 2.822.055 1.15.069 1.54.069 4.891 0 3.351-.014 3.741-.069 4.891-.067 1.481-.312 2.285-.519 2.822-.276.711-.603 1.218-1.097 1.712-.494.494-1.001.821-1.712 1.097-.537.207-1.341.452-2.822.519-1.15.055-1.54.069-4.891.069-3.351 0-3.741-.014-4.891-.069-1.481-.067-2.285-.312-2.822-.519-.711-.276-1.218-.603-1.712-1.097-.494-.494-.821-1.001-1.097-1.712-.207-.537-.452-1.341-.519-2.822-.055-1.15-.069-1.54-.069-4.891 0-3.351.014-3.741.069-4.891.067-1.481.312-2.285.519-2.822.276-.711.603-1.218 1.097-1.712.494-.494 1.001-.821 1.712-1.097.537-.207 1.341-.452 2.822-.519 1.15-.055 1.54-.069 4.891-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.646-1.44-1.44-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 EcoTrack. All rights reserved. |
              <Link to="/accessibility" className="hover:text-emerald-400 ml-1">
                Accessibility
              </Link>{" "}
              |
              <Link to="/privacy" className="hover:text-emerald-400 ml-1">
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
