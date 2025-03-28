import { ReactNode } from "react";

// Props interface for AuthLayout
interface AuthLayoutProps {
  children: ReactNode; // Children components to be rendered inside the layout
}

// AuthLayout component for rendering authentication-related pages
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Render children components */}
      {children}
    </div>
  );
};

export default AuthLayout;