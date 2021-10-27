import Index from "views/Index.js";
import Profile from "views/auth/Profile.js";
import Maps from "views/auth/Maps.js";
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";
import Tables from "views/auth/Tables.js";
import Icons from "views/auth/Icons.js";
import AddTour from "views/Tours/agent/AddTour";
import AddPackage from "views/package/agent/AddPackage";
import ToursAgent from "views/Tours/agent/ToursAgent";
import EditTour from "views/Tours/agent/EditTour";
import PackageAgent from "views/package/agent/PackageAgent";
import EditPackage from "views/package/agent/EditPackage";
import CalendarHalfAndOneAgent from "views/CalendarHalfAndOne/CalendarHalfAndOneAgent";
import CalendarThanMoreOneAgent from "views/CalendarThanMoreOne/CalendarThanMoreOneAgent";

var routesAgent = [
  /* Menu Side bar */
  {
    path: "/Tours",
    name: "Tours",
    show: "Yes",
    icon: "ni ni-tv-2 text-primary",
    component: ToursAgent,
    layout: "/agent",
  },
  {
    path: "/PackageDetails",
    name: "Package Details",
    show: "Yes",
    icon: "ni ni-books text-info",
    component: PackageAgent,
    layout: "/agent",
  },
  {
    path: "/CalendarForHalfAndDay",
    name: "Calendar For Half And 1 Day",
    show: "Yes",
    icon: "ni ni-calendar-grid-58 text-warning",
    component: CalendarHalfAndOneAgent,
    layout: "/agent",
  },
  {
    path: "/CalendarForThanDay",
    name: "Calendar For More Than 1 Day",
    show: "Yes",
    icon: "ni ni-calendar-grid-58 text-success",
    component: CalendarThanMoreOneAgent,
    layout: "/agent",
  },
  /* path */
  {
    path: "/login",
    show: "No",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    show: "No",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/AddTour",
    name: "Add Tour",
    show: "No",
    component: AddTour,
    layout: "/agent"
  },
  {
    path: "/AddPackage",
    name: "Add Package",
    show: "No",
    component: AddPackage,
    layout: "/agent"
  },
  {
    path: "/editTour/:id_data_tour",
    name: "Edit Tour",
    show: "No",
    component: EditTour,
    layout: "/agent"
  },
  {
    path: "/testIcon",
    name: "test icon",
    show: "No",
    component: Icons,
    layout: "/agent"
  },
  {
    path: "/editPackage/:id_package",
    name: "Edit Package",
    show: "No",
    component: EditPackage,
    layout: "/agent"
  },
];
export default routesAgent;
