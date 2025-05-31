// src/components/AdminProtectedRoute.jsx
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null; // or loading spinner

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.publicMetadata.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
