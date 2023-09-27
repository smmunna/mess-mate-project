import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../shared/Login/Login";
import Dashboard from "../layout/Dashboard/Dashboard";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AdminPrivateRoutes from "../PrivateRoutes/AdminPrivateRoutes"
import ManagerPrivateRoutes from "../PrivateRoutes/ManagerPrivateRoutes";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ManagerRequest from "../Pages/Dashboard/ManagerRequest/ManagerRequest";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddMember from "../Pages/Dashboard/AddMember/AddMember";
import ViewMember from "../Pages/Dashboard/ViewMember/ViewMember";
import AddBalance from "../Pages/Dashboard/AddBalance/AddBalance";
import ViewBalance from "../Pages/Dashboard/ViewBalance/ViewBalance";
import DailyCost from "../Pages/Dashboard/DailyCost/DailyCost";
import DailyBazar from "../Pages/Dashboard/DailyBazar/DailyBazar";
import ViewMealStatus from "../Pages/Dashboard/ViewMealStatus/ViewMealStatus";
import MealStatus from "../Pages/Dashboard/MealStatus/MealStatus";
import FormatStorage from "../Pages/Dashboard/FormatStorage/FormatStorage";
import ManagerRequestList from "../Pages/Dashboard/Admin/ManagerRequest/ManagerRequest";
import Notice from "../Pages/Notice/Notice";
import Contact from "../Pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/notice",
        element: <Notice />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
        children: [
          {
            path: '',
            element: <PrivateRoutes><DashboardHome /></PrivateRoutes>
          },
          {
            path: 'request-manager',
            element: <PrivateRoutes><ManagerRequest /></PrivateRoutes>
          },
          {
            path: 'profile',
            element: <PrivateRoutes><Profile /></PrivateRoutes>
          },
          {
            path: 'req-manager-list',
            element: <PrivateRoutes><AdminPrivateRoutes><ManagerRequestList /></AdminPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'add-members',
            element: <PrivateRoutes><ManagerPrivateRoutes><AddMember /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'view-members',
            element: <PrivateRoutes><ManagerPrivateRoutes><ViewMember /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'add-balance',
            element: <PrivateRoutes><ManagerPrivateRoutes><AddBalance /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'view-balance',
            element: <PrivateRoutes><ManagerPrivateRoutes><ViewBalance /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'daily-cost',
            element: <PrivateRoutes><ManagerPrivateRoutes><DailyCost /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'view-meal-status',
            element: <PrivateRoutes><ManagerPrivateRoutes><ViewMealStatus /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'daily-bazar',
            element: <PrivateRoutes><ManagerPrivateRoutes><DailyBazar /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'current-status',
            element: <PrivateRoutes><ManagerPrivateRoutes><MealStatus /></ManagerPrivateRoutes></PrivateRoutes>
          },
          {
            path: 'format-storage',
            element: <PrivateRoutes><ManagerPrivateRoutes><FormatStorage /></ManagerPrivateRoutes></PrivateRoutes>
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
]);

export default router;
