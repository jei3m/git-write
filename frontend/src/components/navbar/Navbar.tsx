import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleMode } from "../navbar/ToggleMode";
import { FileText } from "lucide-react";
import ProfileDialog from "../navbar/ProfileDialog";
import { useGithubStore } from "@/store/github.store";
import { GithubUser } from "@/types/github.types";
import { UserAuth } from '@/contexts/FirebaseContext';

function Navbar() {
  const { gitUser, fetchUserData } = useGithubStore();
  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
  const { currentUser } = UserAuth();
  const githubUID = currentUser.providerData[0].uid;

  useEffect(() => {
    if (currentUser){
      fetchUserData(githubUID);
    }
  },[currentUser])

  useEffect(() => {
    if (gitUser) {
      setGithubUser(gitUser);
      console.log(gitUser); // Log the fetched user data t
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