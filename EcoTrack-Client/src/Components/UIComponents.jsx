import React from "react";
import {
  FaExclamationTriangle,
  FaTimesCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaBug,
} from "react-icons/fa";

const ErrorBoundary = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚨</div>
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 mb-4">
          The application encountered an unexpected error.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-emerald-600 ${sizeClasses[size]}`}
      ></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export const ErrorMessage = ({ message, type = "error", onDismiss }) => {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <FaTimesCircle className="text-red-500" />;
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "info":
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaBug className="text-gray-500" />;
    }
  };

  const getBackgroundClass = () => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className={`rounded-lg p-4 mb-4 border ${getBackgroundClass()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{message}</p>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss"
              >
                <FaTimesCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SuccessMessage = ({ message, onDismiss }) => (
  <ErrorMessage message={message} type="success" onDismiss={onDismiss} />
);

export const WarningMessage = ({ message, onDismiss }) => (
  <ErrorMessage message={message} type="warning" onDismiss={onDismiss} />
);

export const InfoMessage = ({ message, onDismiss }) => (
  <ErrorMessage message={message} type="info" onDismiss={onDismiss} />
);

export const EmptyState = ({
  title = "No data found",
  message = "There are no items to display at this time.",
  icon = "📭",
  action = null,
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};

export const SkeletonLoader = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
      <div className="h-8 bg-gray-200 rounded mt-4"></div>
    </div>
  </div>
);

export const ButtonLoader = () => (
  <div className="inline-flex items-center space-x-2">
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
    <span>Loading...</span>
  </div>
);

export default ErrorBoundary;
