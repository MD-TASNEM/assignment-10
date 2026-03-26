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
      // {
      //   path: "services",
      //   Component: Services,
      // },

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
