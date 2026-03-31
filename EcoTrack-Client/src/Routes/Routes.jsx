import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Challenges from "../Pages/Challenges";
import ChallengeDetail from "../Pages/ChallengeDetail";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyActivities from "../Pages/MyActivities";
import Profile from "../Pages/Profile";
import Achievements from "../Pages/Achievements";
import Settings from "../Pages/Settings";
import EcoTips from "../Pages/EcoTips";
import UpcomingEvents from "../Pages/UpcomingEvents";
import FAQs from "../Pages/FAQs";
import ErrorBoundary from "../Components/ErrorBoundary";
import PublicLayout from "../Layouts/PublicLayout";
import ProtectedLayout from "../Layouts/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicLayout>
        <Home />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "challenges",
    element: (
      <PublicLayout>
        <Challenges />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "challenges/:id",
    element: (
      <PublicLayout>
        <ChallengeDetail />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "login",
    element: (
      <PublicLayout>
        <Login />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "register",
    element: (
      <PublicLayout>
        <Register />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "my-activities",
    element: (
      <ProtectedLayout>
        <MyActivities />
      </ProtectedLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "profile",
    element: (
      <ProtectedLayout>
        <Profile />
      </ProtectedLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "achievements",
    element: (
      <ProtectedLayout>
        <Achievements />
      </ProtectedLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "settings",
    element: (
      <ProtectedLayout>
        <Settings />
      </ProtectedLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "eco-tips",
    element: (
      <PublicLayout>
        <EcoTips />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "upcoming-events",
    element: (
      <PublicLayout>
        <UpcomingEvents />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "faqs",
    element: (
      <PublicLayout>
        <FAQs />
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-500 mb-4">
              The page you're looking for doesn't exist.
            </p>
            <a
              href="/"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </PublicLayout>
    ),
    errorElement: <ErrorBoundary />,
  },
]);
