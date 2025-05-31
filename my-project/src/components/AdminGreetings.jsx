// src/components/AdminGreeting.jsx
import { useUser } from "@clerk/clerk-react";

const AdminGreeting = () => {
  const { user } = useUser();

  if (user?.publicMetadata?.role === "admin") {
    return <p>Welcome, Admin!</p>;
  }

  return <p>You are not an admin.</p>;
};

export default AdminGreeting;
