import React, { useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSave,
  FaUndo,
  FaTimes,
  FaSpinner,
  FaShieldAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaImage,
} from "react-icons/fa";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, setUser, loading, updateUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    photo: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.displayName || "",
        photo: user.photoURL || "",
      });
      setPreviewImage(user.photoURL || "");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-600 font-medium">Loading profile data...</p>
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

    if (name === "photo") {
      setPreviewImage(value);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const { userName, photo } = formData;

    try {
      await updateUser({ displayName: userName, photoURL: photo });
      setUser({ ...user, displayName: userName, photoURL: photo });
      toast.success(
        "Profile updated successfully! 🌱 Your eco-journey continues!",
        {
          duration: 4000,
          position: "top-right",
          icon: "🎉",
          style: {
            background: "#10B981",
            color: "#fff",
            borderRadius: "12px",
          },
        },
      );
      navigate("/profile");
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
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleReset = () => {
    setFormData({
      userName: user.displayName || "",
      photo: user.photoURL || "",
    });
    setPreviewImage(user.photoURL || "");
    toast.success("Changes reset to original values", {
      duration: 2000,
      position: "top-right",
      icon: "🔄",
      style: {
        background: "#F59E0B",
        color: "#fff",
        borderRadius: "12px",
      },
    });
  };

  const getUserInitials = () => {
    const name = formData.userName || user.displayName || "Eco Warrior";
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const hasChanges =
    formData.userName !== user.displayName || formData.photo !== user.photoURL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6 transition-colors duration-200 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <FaLeaf className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Update Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep your profile information up to date and continue making a
            difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Profile Preview */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-full max-w-md">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>

                {/* Profile Image */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg bg-white p-1">
                      {previewImage ? (
                        <img
                          className="w-full h-full rounded-xl object-cover"
                          src={previewImage}
                          alt={formData.userName || user.displayName || "User"}
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center ${
                          previewImage ? "hidden" : "flex"
                        }`}
                      >
                        <span className="text-3xl font-bold text-white">
                          {getUserInitials()}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <FaCamera className="text-white text-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Profile Info */}
              <div className="pt-16 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {formData.userName || user.displayName || "Eco Warrior"}
                </h2>
                <p className="text-sm text-green-600 mb-4">
                  {hasChanges ? "Preview (Unsaved)" : "Current Profile"}
                </p>

                <div className="space-y-3 text-left bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700 flex items-center space-x-2">
                      <FaEnvelope className="text-green-500" />
                      <span>Email:</span>
                    </span>
                    <span className="text-sm text-gray-900 font-medium">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700 flex items-center space-x-2">
                      <FaShieldAlt className="text-green-500" />
                      <span>User ID:</span>
                    </span>
                    <span className="text-sm text-gray-900 font-mono">
                      {user.uid.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-green-200">
                    <span className="text-sm font-medium text-green-700 flex items-center space-x-2">
                      <FaInfoCircle className="text-green-500" />
                      <span>Status:</span>
                    </span>
                    <span
                      className={`text-sm font-medium ${hasChanges ? "text-yellow-600" : "text-green-600"}`}
                    >
                      {hasChanges ? "📝 Unsaved changes" : "✅ Up to date"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-8">
              <div className="flex items-center space-x-2 mb-6">
                <FaUser className="text-green-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Profile
                </h2>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Email Field (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 focus:outline-none cursor-not-allowed"
                      value={user.email}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email address cannot be changed
                  </p>
                </div>

                {/* Display Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      required
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This name will be displayed on your profile and activities
                  </p>
                </div>

                {/* Photo URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaImage />
                    </div>
                    <input
                      type="url"
                      name="photo"
                      value={formData.photo}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a valid image URL (JPG, PNG, or GIF)
                  </p>
                </div>

                {/* Change Indicators */}
                {hasChanges && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 animate-fadeIn">
                    <div className="flex items-start space-x-3">
                      <FaInfoCircle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-yellow-800 font-medium">
                          Unsaved changes detected
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          You have made changes that haven't been saved yet.
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
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!hasChanges}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaUndo />
                    <span>Reset</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating || !hasChanges}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isUpdating ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Update</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Help Text */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <FaShieldAlt className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-800">
                        <strong>Privacy Note:</strong> Your profile information
                        is securely stored and only shared within the EcoTrack
                        community.
                      </p>
                      <p className="text-xs text-green-700 mt-2">
                        Profile updates may take a few moments to reflect across
                        all devices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview Info */}
                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    Need help? Contact us at support@ecotrack.com
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;
