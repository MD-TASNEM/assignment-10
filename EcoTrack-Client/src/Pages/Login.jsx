import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLeaf, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || "/";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else {
      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter";
      }
      // Check for at least one lowercase letter
      if (!/[a-z]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one lowercase letter";
      }
      // Check for at least one special character
      if (!/[!@#$%^&*()_+=\-[\]{}|;:'",.<>?]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one special character";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signIn(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      setIsLoading(false);
      setErrors({
        general: error.message || "Login failed. Please try again.",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      await signInWithGoogle();
      navigate("/my-activities", { replace: true });
    } catch (error) {
      setIsLoading(false);
      setErrors({
        general: error.message || "Google sign-in failed. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <FaLeaf className="text-4xl text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Login to EcoTrack
            </h1>
          </div>
          <p className="text-gray-600">Join the sustainable living community</p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm pr-10 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-t-2 border-emerald-500"></div>
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            {/* Google Sign-In */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaGoogle className="h-5 w-5 mr-2" />
                Google Sign-In
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Sign up
              </Link>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <Link
                to="/forgot-password"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
