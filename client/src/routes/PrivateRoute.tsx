/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

// PrivateRoute component that protects routes and ensures authentication
const PrivateRoute = () => {
  const { accounts } = useMsal(); // Access user accounts
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Authentication state

  useEffect(() => {
    // Check if the user is authenticated
    if (accounts.length > 0 && accounts[0]?.name) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [accounts]);

  if (isAuthenticated === false) {
    console.log("User not authenticated");
    return null; // Prevent access to protected routes
  } else {
    //console.log("User authenticated");
    return <Outlet />; // Render child routes
  }
};

export default PrivateRoute;