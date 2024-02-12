import { lazy, Suspense } from "react";
import { userPath } from "./routeConfig";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "../components/auth/PublicRoute";
import PrivateRoute from "../components/auth/PrivateRoute";
import Spinner from "../components/constant/Spinner";

const Home = lazy(() => import("../pages/Home"));
const LogIn = lazy(() => import("../pages/LogIn"));
const Profile = lazy(() => import("../pages/Profile"));
const Country = lazy(() => import("../pages/Country"));
const Settings = lazy(() => import("../pages/Settings"));

function UserRoute() {
  return (
    <Routes>
      <Route element={<PublicRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.login} element={<LogIn />} />
      </Route>
      <Route element={<PrivateRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.home} element={<Home />} />
        <Route path={userPath.profile} element={<Profile />} />
        <Route path={userPath.country} element={<Country />} />
        <Route path={userPath.settings} element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default function UserRouteWithSuspense() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserRoute />
    </Suspense>
  );
}
