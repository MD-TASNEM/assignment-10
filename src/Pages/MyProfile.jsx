import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, Navigate } from "react-router";

const MyProfile = () => {
  const { user, loading } = React.useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdate = () => {
    navigate("/updateprofile");
  };

  const formatUserId = (uid) => {
    return `${uid.substring(0, 8)}...${uid.substring(uid.length - 8)}`;
  };


  const getAvatarUrl = () => {

    if (user.photoURL) {
      return user.photoURL;
    }


    if (user.email) {
      const emailHash = user.email.trim().toLowerCase();
      return `https://www.gravatar.com/avatar/${emailHash}?s=128&d=identicon`;
    }


    return null;
  };


  const getUserInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }

    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "U";
  };


  const getAvatarBackgroundColor = () => {
    const seed = user.uid || user.email || "user";
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-green-500 to-green-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-yellow-600",
      "from-indigo-500 to-indigo-600",
      "from-pink-500 to-pink-600",
      "from-teal-500 to-teal-600",
    ];

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const avatarUrl = getAvatarUrl();
  const userInitials = getUserInitials();
  const avatarBackground = getAvatarBackgroundColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                {/* Profile Image */}
                <div className="absolute -bottom-12 left-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg bg-white p-1">
                      {avatarUrl ? (
                        <img
                          className="w-full h-full rounded-xl object-cover"
                          src={avatarUrl}
                          alt={user.displayName || "User"}
                          onError={(e) => {
                            // If the image fails to load, show the fallback avatar
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full rounded-xl bg-gradient-to-br ${avatarBackground} flex items-center justify-center ${
                          avatarUrl ? "hidden" : "flex"
                        }`}
                      >
                        <span className="text-3xl font-bold text-white">
                          {userInitials}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="absolute top-6 right-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-16 pb-8 px-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {user.displayName || "No Name Provided"}
                  </h2>
                  <p className="text-gray-500">
                    Member since{" "}
                    {new Date(user.metadata?.creationTime).getFullYear() ||
                      "2024"}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        User ID
                      </label>
                      <p className="text-gray-900 font-mono text-sm">
                        {formatUserId(user.uid)}
                      </p>
                    </div>
                  </div>

                  {/* Email Verification Status */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div
                      className={`p-3 rounded-lg ${
                        user.emailVerified ? "bg-green-100" : "bg-yellow-100"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          user.emailVerified
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            user.emailVerified
                              ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          }
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Account Status
                      </label>
                      <div className="flex items-center space-x-2">
                        <p
                          className={`font-medium ${
                            user.emailVerified
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {user.emailVerified ? "Verified" : "Not Verified"}
                        </p>
                        {!user.emailVerified && (
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Verify Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Avatar Source Info */}
                  {!user.photoURL && (
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-blue-700 mb-1">
                          Profile Avatar
                        </label>
                        <p className="text-blue-600 text-sm">
                          This avatar was generated based on your email address.
                          <button
                            onClick={handleUpdate}
                            className="ml-1 font-medium hover:text-blue-800 underline"
                          >
                            Upload a custom photo
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Account Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium text-gray-900">
                    {new Date(user.metadata?.creationTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last login</span>
                  <span className="font-medium text-gray-900">
                    {new Date(
                      user.metadata?.lastSignInTime
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile photo</span>
                  <span className="font-medium text-gray-900">
                    {user.photoURL ? "Custom" : "Generated"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleUpdate}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-blue-600"
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
                  <span className="text-gray-700 font-medium">
                    Update Profile Photo
                  </span>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-green-600"
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
                  <span className="text-gray-700 font-medium">
                    Change Password
                  </span>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Help & Support
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
