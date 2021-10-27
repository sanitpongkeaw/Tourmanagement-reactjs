import Index from "views/Index.js";
import Profile from "views/auth/Profile.js";
import Maps from "views/auth/Maps.js";
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";
import Tables from "views/auth/Tables.js";
import Icons from "views/auth/Icons.js";
import TravelAgent from "../views/travelAgent/TravelAgent";
import Tours from "../views/Tours/admin/ToursAdmin";
import EditTour from "../views/Tours/agent/EditTour";
import PackageAdmin from "views/package/admin/PackageAdmin";
import EditPackage from "views/package/agent/EditPackage";

var routesSuperAdmin = [
  {
    path: "/index",
    name: "Travel Agent",
    show: "Yes",
    icon: "ni ni-circle-08 text-info",
    component: TravelAgent,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   show: "Yes",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   show: "Yes",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   show: "Yes",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   show: "Yes",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   show: "Yes",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons test",
  //   show: "Yes",
  //   icon: "ni ni-circle-08 text-info",
  //   component: Icons,
  //   layout: "/admin",
  // },
  /* use */
  // {
  //   path: "/SuperAdmin",
  //   name: "Super Admin",
  //   show: "Yes",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/admin",
  // },
  // {
  //   path: "/TravelAgent",
  //   name: "Travel Agent",
  //   show: "Yes",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: TravelAgent,
  //   layout: "/admin",
  // },
  {
    path: "/Tours",
    name: "Tours",
    show: "Yes",
    icon: "ni ni-archive-2 text-warning",
    component: Tours,
    layout: "/admin",
  },
  {
    path: "/PackageDetails",
    name: "Package Details",
    show: "Yes",
    icon: "ni ni-tv-2 text-primary",
    component: PackageAdmin,
    layout: "/admin",
  },
  {
    path: "/editTour/:id_data_tour",
    name: "Edit Tour",
    show: "No",
    icon: "ni ni-tv-2 text-primary",
    component: EditTour,
    layout: "/admin",
  },
  {
    path: "/editPackage/:id_package",
    name: "Edit Package",
    show: "No",
    icon: "ni ni-tv-2 text-primary",
    component: EditPackage,
    layout: "/admin",
  },
];
export default routesSuperAdmin;
