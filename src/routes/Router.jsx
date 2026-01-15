import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";

import Subscription from "../page/Subscription/Subscription";

import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Categories from "../page/CategoriesManagement/Categories";
import Subcategory from "../page/CategoriesManagement/Subcategory";

import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import About from "../page/Settings/About";
import Login from "../Auth/Login";
import ForgetPass from "../Auth/ForgetPass";
import ProviderManagement from "../page/ProviderManagement/ProviderManagement";
import BookingManagement from "../page/BookingManagement/BookingManagement";
import SingleBooking from "../page/BookingManagement/SingleBooking";
import SingleProvider from "../page/ProviderManagement/SingleProvider";
import SingleUserDetails from "../page/UserManagement/SingleUserManagement";
import ServiceManagement from "../page/ServiceManagement/ServiceManagement";
import ProviderType from "../page/Provider type/ProviderType";
import Articles from "../page/Articles/Articles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },

      {
        path: "/dashboard/user-details/:id",
        element: <SingleUserDetails></SingleUserDetails>,
      },

      {
        path: "/dashboard/ProviderManagement",
        element: <ProviderManagement></ProviderManagement>,
      },
      {
        path: "/dashboard/BookingManagement",
        element: <BookingManagement></BookingManagement>,
      },
      {
        //  navigate(`/booking-details/${record._id}`)}
        path: "/dashboard/booking-details/:id",
        element: <SingleBooking></SingleBooking>,
      },
      {
        path: "/dashboard/serviceManagement",
        //  "/dashboard/addService"
        element: <ServiceManagement></ServiceManagement>,
      },
      {
        path: "/dashboard/providerType",
        //  "/dashboard/addService"
        element: <ProviderType></ProviderType>,
      },
      {
        path: "/dashboard/articles",
        //  "/dashboard/addService"
        element: <Articles></Articles>,
      },
      {
        path: "/dashboard/provider-details/:id",
        element: <SingleProvider></SingleProvider>,
      },
      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Subcategory",
        element: <Subcategory></Subcategory>,
      },
      {
        path: "/dashboard/Subscription",
        element: <Subscription></Subscription>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/aboutUs",
        element: <About></About>,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgot-password",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verification",
    element: <Verify></Verify>,
  },
  {
    path: "/reset-password",
    element: <ResetPass></ResetPass>,
  },
]);
