import { Button } from "../ui/button";
import { ToggleMode } from "../navbar/ToggleMode";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function UnauthBar() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };
  
  return (
    <nav className="fixed top-4 left-0 right-0 z-20 mx-auto max-w-7xl flex items-center justify-between py-2 px-6 h-[50px] rounded-xl border border-gray-300 bg-gray-100/90 dark:bg-black/90 dark:border-neutral-700 dark:bg-neutral-950"> 

        <Link to="/" className="flex flex-row items-center text-lg font-bold text-black dark:text-white">
            <FileText className="mr-1"/>
            GitWrite.
        </Link>

        <div className="flex flex-row items-center gap-x-2">
        <ToggleMode />
        <Button size="sm" className="bg-gray-900 dark:bg-white border border-neutral-700 dark:border-gray-300 text-white dark:text-black" onClick={handleLogin}>
            Get Started
        </Button>
        </div>

    </nav>
  )
}

export default UnauthBar