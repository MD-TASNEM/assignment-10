import React from "react";
import { FaLeaf, FaCog } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-2xl text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">EcoTrack</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Settings Coming Soon</h2>
          <p className="text-gray-500 mb-4">Account settings and preferences will be available here.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
