import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

// The main App component that sets the document title dynamically
const App = () => {
  useEffect(() => {
    // Set the document title using an environment variable or a default value
    document.title = import.meta.env.VITE_NAME || "Default Title";
  }, []);

  // Render the application routes
  return <AppRoutes />;
};

export default App;
