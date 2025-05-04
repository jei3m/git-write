import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ToggleMode } from "./navbar/ToggleMode";
import { FileText } from "lucide-react";

function Navbar() {
  return (
    <>
      <SignedIn>
        <nav className="flex items-center justify-between py-2 px-6 h-[50px] border-b border-gray-300 dark:border-neutral-700 dark:bg-neutral-950"> 

          <Link to="/" className="flex flex-row items-center text-lg font-bold text-black dark:text-white">
              <FileText className="mr-1"/>
              GitWrite.
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-x-3">
                <ToggleMode />
                <div className="flex flex-col items-center justify-center p-[3px] rounded-full bg-black/20 dark:bg-white/30">
                    <UserButton />
                </div>
            </div>   
          </div>
        </nav>
      </SignedIn>
      <SignedOut>
        <nav className="fixed top-4 left-0 right-0 mx-auto max-w-7xl flex items-center justify-between py-2 px-6 h-[50px] rounded-xl border border-gray-300 bg-gray-100/90 dark:bg-black/90 dark:border-neutral-700 dark:bg-neutral-950"> 

          <Link to="/" className="flex flex-row items-center text-lg font-bold text-black dark:text-white">
              <FileText className="mr-1"/>
              GitWrite.
          </Link>

          <div className="flex flex-row items-center gap-x-2">
            <ToggleMode />
            <Button size="sm" asChild className="bg-gray-900 dark:bg-white border border-neutral-700 dark:border-gray-300 text-white dark:text-black">
              <SignInButton mode="modal" />
            </Button>
          </div>

        </nav>
      </SignedOut>
    </>
  );
}

export default Navbar;