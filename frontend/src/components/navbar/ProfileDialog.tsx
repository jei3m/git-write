import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ExternalLink, LogOut, MapPin } from "lucide-react";
import { UserAuth } from "@/contexts/FirebaseContext";
import {GithubUser} from "@/types/github.types";

function ProfileDialog({user}: {user:GithubUser | null}) {
    const { logOut } = UserAuth();

    return (
        <Dialog>
            <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-[2px] rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer">
                <img src={user?.avatar_url} alt={user?.name} className="w-8 h-8 rounded-full"/>
            </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-2xl bg-white dark:bg-[#0d1117] text-black dark:text-white border dark:border-[#30363d]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader className="border-b border-gray-200 dark:border-[#21262d] pb-4">
                    <DialogTitle>
                        <div className="flex gap-3">
                            <img src={user?.avatar_url} alt={user?.name} className="w-20 h-20 rounded-full border dark:border-[#30363d]"/>
                            <div className="flex flex-col items-start gap-y-1">
                                <span className="text-2xl font-semibold text-gray-900 dark:text-white">{user?.name}</span>
                                <span className="text-md font-normal text-gray-600 dark:text-gray-300">{user?.login}</span>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="-my-1"></DialogDescription>
                </DialogHeader>
                <p className="text-lg text-gray-600 dark:text-gray-300">{user?.bio || ""}</p>
                <div className="flex flex-row space-x-5 items-center justify-between">
                    <p className="text-md text-gray-600 dark:text-gray-300 flex items-center"><MapPin className="mr-1 h-5 w-5"/>{user?.location || ""}</p>
                    <a 
                        href={user?.html_url || ""} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-md text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                        <ExternalLink className="text-gray-600 dark:text-gray-400 h-5 w-5" />
                        <span className="mt-[1px]">{user?.html_url}</span>
                    </a>

                    <Button className="text-md text-red-500 flex items-center" onClick={logOut}>
                        <LogOut /> Sign Out
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog;