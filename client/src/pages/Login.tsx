import { LoginForm } from "@/components/login-form";

// Login page that renders the login form
const Login = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Application logo and name */}
        <img 
            src={import.meta.env.VITE_LOGO_URL} 
            alt="Logo" 
            className="w-32 h-auto object-contain flex items-center gap-2 self-center font-medium"
          /> 
        {/* Render the login form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;