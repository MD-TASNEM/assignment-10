import React from "react";
import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import User from "../Pages/User";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import MyProfile from "../Pages/MyProfile";
import ForgetPass from "../Pages/ForgetPass";
import ChallengesDetails from "../Pages/ChallengesDetails";
import PrivateRoutes from "./PrivateRoutes";
import Challenges from "../Pages/Challenges";
import UpdateProfile from "../Pages/UpdateProfile";
import Impact from "../Pages/Impact";
import Community from "../Pages/Community";
import AddChallenge from "../Pages/AddChallenge";
import JoinChallenge from "../Pages/JoinChallenge";
import EcoTips from "../Pages/EcoTips";
import Leaderboard from "../Pages/Leaderboard";
import About from "../Pages/About";
import FAQs from "../Pages/FAQs";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService";
import Accessibility from "../Pages/Accessibility";
import NotFound from "../Pages/NotFound";
import {
  LegacyChallengeDetailRedirect,
  NavigateReplace,
} from "./redirects";

const protectedImpact = (
  <PrivateRoutes>
    <Impact />
  </PrivateRoutes>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children: [
      { index: true, Component: Home },

      { path: "login", Component: User },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgetPass },

      { path: "my-activities", element: protectedImpact },
      { path: "my-activities/:id", element: protectedImpact },

      { path: "community", Component: Community },
      { path: "leaderboard", Component: Leaderboard },
      { path: "about", Component: About },
      { path: "eco-tips", Component: EcoTips },
      { path: "faqs", Component: FAQs },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-service", Component: TermsOfService },
      { path: "accessibility", Component: Accessibility },

      { path: "challenges", element: <Challenges /> },
      {
        path: "challenges/add",
        element: (
          <PrivateRoutes>
            <AddChallenge />
          </PrivateRoutes>
        ),
      },
      {
        path: "challenges/join/:id",
        element: (
          <PrivateRoutes>
            <JoinChallenge />
          </PrivateRoutes>
        ),
      },
      { path: "challenges/:id", element: <ChallengesDetails /> },

      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoutes>
            <UpdateProfile />
          </PrivateRoutes>
        ),
      },

      /* Legacy URLs → canonical (SPA refresh / old links still work) */
      { path: "user", element: <NavigateReplace to="/login" /> },
      { path: "Impact", element: <NavigateReplace to="/my-activities" /> },
      { path: "impact", element: <NavigateReplace to="/my-activities" /> },
      { path: "Community", element: <NavigateReplace to="/community" /> },
      { path: "Leaderboard", element: <NavigateReplace to="/leaderboard" /> },
      { path: "About", element: <NavigateReplace to="/about" /> },
      { path: "EcoTips", element: <NavigateReplace to="/eco-tips" /> },
      { path: "ecotips", element: <NavigateReplace to="/eco-tips" /> },
      { path: "FAQs", element: <NavigateReplace to="/faqs" /> },
      {
        path: "PrivacyPolicy",
        element: <NavigateReplace to="/privacy-policy" />,
      },
      {
        path: "TermsOfService",
        element: <NavigateReplace to="/terms-of-service" />,
      },
      {
        path: "Accessibility",
        element: <NavigateReplace to="/accessibility" />,
      },
      { path: "forgetpass", element: <NavigateReplace to="/forgot-password" /> },
      { path: "Challenges", element: <NavigateReplace to="/challenges" /> },
      {
        path: "Challenges/:ChallengesId",
        element: <LegacyChallengeDetailRedirect />,
      },
      {
        path: "updateprofile",
        element: <NavigateReplace to="/update-profile" />,
      },

      { path: "*", Component: NotFound },
    ],
  },
]);
