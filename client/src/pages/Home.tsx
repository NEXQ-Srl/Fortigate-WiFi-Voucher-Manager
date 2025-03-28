import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Home component that redirects to the login page
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the login page on component mount
    navigate("/login");
  }, [navigate]);

  return null; // No UI is rendered
};

export default Home;
