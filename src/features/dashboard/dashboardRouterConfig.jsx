import Home from "./routes/Home";
import Addons from "./routes/Addons";
import Activities from "./routes/Activities";
import TripPackages from "./routes/TripPackages";
import Destination from "./routes/Destination";
import Packages from "./routes/Packages";
import Affiliate from "./routes/Affiliate";
import Compigens from "./routes/Compigens";
import Reports from "./routes/Reports";
import Clients from "./routes/Clients";
import Nssm from "./routes/Nssm";
import Scheduling from "./routes/Scheduling";
import InviteUser from "./routes/InviteUser";
import Permissions from "./routes/Permissions";
import Fleet from "./routes/Fleet";
import FleetForm from "./routes/forms/FleetForm";
import AddonForm from "./routes/forms/AddonForm";
import TripPackageForm from "./routes/forms/TripPackageForm";
import ActivitiesForm from "./routes/forms/ActivitiesForm";
import FleetProfile from "./components/fleet/fleet-details/FleetProfile";
import ManageAccount from "./routes/ManageAccount";
import Booking from "./components/booking-scheduling/Booking";
import CreatePermission from "./routes/CreatePermission";
import CreateUser from "./routes/CreateUser";

export const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/invite-user", element: <InviteUser /> },
  { path: "/invite-user/create-user", element: <CreateUser /> },
  { path: "/invite-user/edit-user/:id", element: <CreateUser /> },
  { path: "/invite-user/permissions", element: <Permissions /> },
  {
    path: "/invite-user/permissions/create-permission",
    element: <CreatePermission />
  },
  {
    path: "/invite-user/permissions/edit-permissions/:id",
    element: <CreatePermission />
  },

  { path: "/fleet", element: <Fleet /> },
  { path: "/fleet/:id", element: <FleetProfile /> },
  { path: "/fleet/add-yacht/*", element: <FleetForm /> },
  { path: "/fleet/edit-yacht/:id/*", element: <FleetForm /> },

  { path: "/addons", element: <Addons /> },
  { path: "/addons/add-addon", element: <AddonForm /> },
  { path: "/addons/edit-addon/:id", element: <AddonForm /> },

  { path: "/trip-packages", element: <TripPackages /> },
  { path: "/trip-packages/add-trip-package", element: <TripPackageForm /> },
  {
    path: "/trip-packages/edit-trip-package/:id",
    element: <TripPackageForm />
  },

  { path: "/activities", element: <Activities /> },
  { path: "/activities/add-activity", element: <ActivitiesForm /> },
  { path: "/activities/edit-activity/:id", element: <ActivitiesForm /> },

  { path: "/manage-account/*", element: <ManageAccount /> },

  { path: "/bookings-scheduling", element: <Scheduling /> },
  { path: "/bookings-scheduling/booking", element: <Booking /> },

  // OTHER_ROUTES
  { path: "/destination", element: <Destination /> },
  { path: "/packages", element: <Packages /> },
  { path: "/affiliate", element: <Affiliate /> },
  { path: "/compigens", element: <Compigens /> },
  { path: "/reports", element: <Reports /> },
  { path: "/clients", element: <Clients /> },
  { path: "/nssm", element: <Nssm /> },
  { path: "*", element: <>404 page not found</> }
];
