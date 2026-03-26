import React from "react";
import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import User from "../Pages/User";
import Register from "../Pages/Register";
import Home from "../Pages/Home";

import MyProfile from "../Pages/MyProfile";
import ForgetPass from "../Pages/ForgetPass";

import ServiceDetails from "../Pages/ServiceDetails";
import PrivateRoutes from "./PrivateRoutes";
import Challenges from "../Pages/Challenges";
import UpdateProfile from "../Pages/UpdateProfile";
import Impact from "../Pages/Impact";
import EcoTips from "./../Pages/EcoTips";
import Leaderboard from "./../Pages/Leaderboard";
import About from "./../Pages/About";
import FAQS from "./../Pages/FAQS";
import PrivacyPolicy from "./../Pages/PrivacyPolicy";
import TermsOfService from "./../Pages/TermsOfService";
import Accessibility from "./../Pages/Accessibility";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //     path:'helpContact',
      //     Component:helpContact,
      // },
      {
        path: "user",
        Component: User,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "Impact",
        Component: Impact,
      },
      {
        path: "Leaderboard",
        Component: Leaderboard,
      },
      {
        path: "About",
        Component: About,
      },
      {
        path: "About",
        Component: About,
      },
      {
        path: "EcoTips",
        Component: EcoTips,
      },
      {
        path: "FAQS",
        Component: FAQS,
      },
      {
        path: "PrivacyPolicy",
        Component: PrivacyPolicy,
      },
      {
        path: "TermsOfService",
        Component: TermsOfService,
      },
      {
        path: "Accessibility",
        Component: Accessibility,
      },

      {
        path: "forgetpass",
        Component: ForgetPass,
      },

      // {
      //   path:'service/:id',
      //   Component:Service
      // },
      {
        path: "Challenges",

        element: <Challenges></Challenges>,
      },
      {
        path: "serviceDetails/:serviceId",

        element: (
          <PrivateRoutes>
            <ServiceDetails></ServiceDetails>,
          </PrivateRoutes>
        ),
      },
      {
        path: "profile",

        element: (
          <PrivateRoutes>
            <MyProfile></MyProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "updateprofile",

        element: (
          <PrivateRoutes>
            <UpdateProfile></UpdateProfile>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
