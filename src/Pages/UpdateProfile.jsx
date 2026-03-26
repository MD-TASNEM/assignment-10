import React, { useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, setUser, loading, updateUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    photo: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.displayName || "",
        photo: user.photoURL || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading profile data...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const { userName, photo } = formData;

    try {
      await updateUser({ displayName: userName, photoURL: photo });
      setUser({ ...user, displayName: userName, photoURL: photo });
      toast.success("Profile updated successfully!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      console.error("Update error:", error);
      setUser(user);
      toast.error("Failed to update profile. Please try again.", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleReset = () => {
    setFormData({
      userName: user.displayName || "",
      photo: user.photoURL || "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={handleHome}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Update Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep your profile information up to date
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Profile Preview */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-full max-w-md">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                {/* Profile Image */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-white p-1">
                      {user.photoURL || formData.photo ? (
                        <img
                          className="w-full h-full rounded-xl object-cover"
                          src={formData.photo || user.photoURL}
                          alt={formData.userName || user.displayName || "User"}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${
                          user.photoURL || formData.photo ? "hidden" : "flex"
                        }`}
                      >
                        <span className="text-2xl font-bold text-gray-600">
                          {formData.userName || user.displayName
                            ? (formData.userName || user.displayName)
                                .charAt(0)
                                .toUpperCase()
                            : "U"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Profile Info */}
              <div className="pt-16 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {formData.userName || user.displayName || "No Name Provided"}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {formData.userName !== user.displayName
                    ? "Preview"
                    : "Current Profile"}
                </p>

                <div className="space-y-3 text-left bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Email:
                    </span>
                    <span className="text-sm text-gray-900 font-medium">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      User ID:
                    </span>
                    <span className="text-sm text-gray-900 font-mono">
                      {user.uid.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span className="text-sm text-gray-900">
                      {formData.userName !== user.displayName ||
                      formData.photo !== user.photoURL
                        ? "Unsaved changes"
                        : "Up to date"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-not-allowed"
                      value={user.email}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Display Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="userName"
                      required
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Photo URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo URL
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="photo"
                      required
                      value={formData.photo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a valid image URL
                  </p>
                </div>

                {/* Change Indicators */}
                {(formData.userName !== user.displayName ||
                  formData.photo !== user.photoURL) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-yellow-800 font-medium">
                          Unsaved changes
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          You have made changes to your profile that haven't
                          been saved yet.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={
                      formData.userName === user.displayName &&
                      formData.photo === user.photoURL
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isUpdating ||
                      (formData.userName === user.displayName &&
                        formData.photo === user.photoURL)
                    }
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {isUpdating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Profile updates may take a few
                        moments to reflect across all devices.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
