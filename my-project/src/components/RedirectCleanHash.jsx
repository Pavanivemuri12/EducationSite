import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectCleanHash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove any hash & query after /signup path and redirect cleanly to /signup
    if (location.hash || location.search) {
      navigate("/signup", { replace: true });
    }
  }, [location, navigate]);

  return null; // or a loading spinner
};


export default RedirectCleanHash
