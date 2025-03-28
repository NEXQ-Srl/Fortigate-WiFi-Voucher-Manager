/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useMsal } from '@azure/msal-react';
import { loginRequest } from "@/config/AuthConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// LoginForm component handles user login using Microsoft authentication
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  // Access MSAL instance and accounts
  const { instance, accounts } = useMsal();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to another page if the user is already logged in
    if (accounts && accounts.length > 0) {
      setIsLoading(true);
      navigate('/voucher-generator');
    } else {
      setIsLoading(false);
    }
  }, [accounts, navigate]);

  // Handle login using Microsoft authentication
  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
      //console.log('Login successful' + response);
      setIsLoading(true);
      //navigate("/voucher-generator");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          
          {/* Display application name */}
          <CardTitle className="text-xl">
            {import.meta.env.VITE_NAME}
          </CardTitle>
          
          <hr className="my-2 border-t border-gray-300" />

          <CardTitle className="text-xl">
            Welcome back
          </CardTitle>
          
          
        </CardHeader>
        <CardContent>
          {
            isLoading ? (
              <div className="text-center text-primary">
                Loading...
              </div>
            ) : (
              <form>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4">
                    {/* Login button */}
                    <Button variant="outline" className="w-full" onClick={handleLogin}>
                      <svg xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                          <rect width="7" height="7" />
                          <rect x="8" width="7" height="7" />
                          <rect y="8" width="7" height="7" />
                          <rect x="8" y="8" width="7" height="7" />
                        </g>
                      </svg>
                      Login with Microsoft
                    </Button>
                  </div>
                </div>
              </form>
            )
          }

        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {/* Footer text */}
        Powered By <a href="https://www.nexq.it" target="_blank" rel="noopener noreferrer">NEXQ</a>
      </div>
    </div>
  )
}
