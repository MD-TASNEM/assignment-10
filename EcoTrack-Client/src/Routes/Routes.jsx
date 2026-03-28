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
import EcoTips from "./../Pages/EcoTips";
import Leaderboard from "./../Pages/Leaderboard";
import About from "./../Pages/About";
import FAQs from "./../Pages/FAQs";
import PrivacyPolicy from "./../Pages/PrivacyPolicy";
import TermsOfService from "./../Pages/TermsOfService";
import Accessibility from "./../Pages/Accessibility";
import NotFound from "../Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "login",
        Component: User,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgetPass,
      },
      {
        path: "Impact",
        Component: Impact,
      },
      {
        path: "impact",
        Component: Impact,
      },
      {
        path: "my-activities",
        element: (
          <PrivateRoutes>
            <Impact />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-activities/:id",
        element: (
          <PrivateRoutes>
            <Impact />
          </PrivateRoutes>
        ),
      },
      {
        path: "Community",
        Component: Community,
      },
      {
        path: "community",
        Component: Community,
      },
      {
        path: "Leaderboard",
        Component: Leaderboard,
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
      {
        path: "About",
        Component: About,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "EcoTips",
        Component: EcoTips,
      },
      {
        path: "ecotips",
        Component: EcoTips,
      },
      {
        path: "FAQs",
        Component: FAQs,
      },
      {
        path: "faqs",
        Component: FAQs,
      },
      {
        path: "PrivacyPolicy",
        Component: PrivacyPolicy,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "TermsOfService",
        Component: TermsOfService,
      },
      {
        path: "terms-of-service",
        Component: TermsOfService,
      },
      {
        path: "Accessibility",
        Component: Accessibility,
      },
      {
        path: "accessibility",
        Component: Accessibility,
      },
      {
        path: "forgetpass",
        Component: ForgetPass,
      },
      {
        path: "Challenges",
        element: <Challenges />
      },
      {
        path: "challenges",
        element: <Challenges />
      },
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
      {
        path: "Challenges/:ChallengesId",
        element: <ChallengesDetails />,
      },
      {
        path: "challenges/:id",
        element: <ChallengesDetails />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "updateprofile",
        element: (
          <PrivateRoutes>
            <UpdateProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
