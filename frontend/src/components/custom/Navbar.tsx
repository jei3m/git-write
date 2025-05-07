import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleMode } from "../navbar/ToggleMode";
import { FileText } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileDialog from "../navbar/ProfileDialog";
import { useGithubStore } from "@/store/github.store";
import { GithubUser } from "@/types/github.types";

function Navbar() {
  const { user, isAuthenticated } = useAuth0();
  const { gitUser, fetchUserData } = useGithubStore();
  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
  const githubUsername = user?.nickname;

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData(githubUsername);
    }
  },[isAuthenticated])

  useEffect(() => {
    if (gitUser) {
      setGithubUser(gitUser);
    }
  }, [gitUser]);

  return (
    <>
        <nav className="flex items-center justify-between py-2 px-6 border-b border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"> 

          <Link to="/" className="flex flex-row items-center text-lg font-bold text-black dark:text-white">
              <FileText className="mr-1"/>
              GitWrite.
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-x-3">
              <ToggleMode />
              <ProfileDialog user={githubUser} />
            </div>   
          </div>
        </nav>
    </>
  );
}

export default Navbar;