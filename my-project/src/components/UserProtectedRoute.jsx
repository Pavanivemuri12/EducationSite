// src/components/UserProtectedRoute.jsx
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // or loading spinner

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
