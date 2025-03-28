import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Ticket } from "lucide-react";
import { useMsal } from "@azure/msal-react"; // Import MSAL for authentication
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useFirewallConfig } from "@/hooks/useFirewallConfig";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setSelectedFirewall } from "@/store/firewallSlice";
import { Separator } from "@/components/ui/separator";
import { Firewall } from "@/types/Firewall";

// Props interface for MainLayout
interface MainLayoutProps {
  children: ReactNode; // Children components to be rendered inside the layout
}

// MainLayout component for rendering the main application layout
const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = window.location.pathname;

  // Use MSAL to manage authentication
  const { instance } = useMsal();
  const { accounts } = useMsal(); // Access user accounts
  const userName = accounts.length > 0 ? accounts[0]?.name : "User"; // Get the logged-in user's name

  //const [firewall, setFirewall] = useState(useFirewallConfig()); // Load firewall configuration
  const firewall : Firewall[] = useFirewallConfig(); // Load firewall configuration
  const dispatch = useDispatch<AppDispatch>();
  const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);

  // Function to get initials from a name
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts.length > 1
      ? nameParts[0][0] + nameParts[1][0] // For full name
      : nameParts[0][0]; // For single name
    return initials.toUpperCase();
  };

  // Handle user logout
  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin, // Redirect to home after logout
    });
  };

  // Handle firewall selection change
  const handleSelectChange = (value: string) => {
    const selected = firewall.find(fw => fw.FIREWALL === value);
    if (selected) {
      dispatch(setSelectedFirewall(selected));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header section */}
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={import.meta.env.VITE_LOGO_URL} // Use logo URL from environment variables
              alt="Logo"
              className="h-auto w-[80px] object-contain"
            />
            <span className="hidden font-bold md:inline-block">{import.meta.env.VITE_NAME}</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* User dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {/* Display user initials */}
                <div className="h-8 w-8 bg-primary text-white flex items-center justify-center rounded-md">
                  {getInitials(userName || "User")}
                </div>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="hidden text-sm font-medium md:inline-block">{userName}</span>
        </div>
      </header>
      {/* Sidebar and main content */}
      <div className="flex flex-1">
        <aside className="w-14 border-r bg-muted/40 md:w-64">
          <nav className="flex flex-col gap-2 p-2">
            {/* Firewall selection dropdown */}
            <Select onValueChange={handleSelectChange} value={selectedFirewall?.FIREWALL}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Firewall" />
              </SelectTrigger>
              <SelectContent>
                {firewall.map((fw) => (
                  <SelectItem value={fw.FIREWALL}>
                    {fw.FIREWALL}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
                <Separator />
            {/* Navigation links */}
            <Link to="/voucher-generator">
              <Button
                variant={pathname === "/vouchers/generate" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <LayoutDashboard className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline-block">Generate Voucher</span>
              </Button>
            </Link>
            <Link to="/voucher-list">
              <Button variant={pathname === "/vouchers" ? "secondary" : "ghost"} className="w-full justify-start">
                <Ticket className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline-block">Voucher List</span>
              </Button>
            </Link>
          </nav>
        </aside>
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
