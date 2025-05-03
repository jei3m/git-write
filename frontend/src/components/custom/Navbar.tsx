import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ToggleMode } from "./navbar/ToggleMode";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-2 px-6 h-[50px] border-b border-gray-300 dark:border-neutral-700 dark:bg-neutral-950"> 

      <Link to="/" className="text-lg font-bold text-black dark:text-white">
        GitWrite.
      </Link>

      <div className="flex items-center gap-4">
        <SignedIn>
            <div className="flex flex-row items-center gap-x-3">
                <ToggleMode />
                <div className="flex flex-col items-center justify-center p-[3px] rounded-full bg-black/20 dark:bg-white/30">
                    <UserButton />
                </div>
            </div>   
        </SignedIn>
        <SignedOut>
          <Button size="sm" asChild>
             <SignInButton mode="modal" />
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;