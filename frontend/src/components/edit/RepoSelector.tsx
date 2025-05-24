import { useEffect, useState } from "react";
import { useGithubStore } from "@/store/github.store";
import { Button } from "@/components/ui/button";
import { ChevronDown, CircleX, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SelectRepoProps } from "@/types/component.types";


function SelectRepos({selectedRepo, setSelectedRepo, setRepoFullName, setInitialReadme, setMarkdown}: SelectRepoProps) {
    const { repos, fetchRepos, readme, fetchReadme, gitUser, fetchSHA } = useGithubStore();
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const githubUsername = gitUser?.login

    const filteredRepos = repos.filter(repo => 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectRepo = (repoName: string, repoTitle: string) => {
        setSelectedRepo(repoTitle);
        setOpen(false);
        setRepoFullName(repoName);
        fetchReadme(repoName);
        fetchSHA(repoName);
    };

    const handleClearRepo = () => {
        setInitialReadme("")
        setMarkdown("")
        setSelectedRepo("")
        setRepoFullName("")
        useGithubStore.setState({ readme: "", sha: "" });
    };

    useEffect(() => {
        if (githubUsername) {
            fetchRepos(githubUsername);
        }
    }, [githubUsername, fetchRepos]);

    useEffect(() => {
        if (readme) {
            setMarkdown(readme);
            setInitialReadme(readme);
        }
    }, [readme]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className="w-[140px] lg:w-[220px] justify-between bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white"
                >
                    <span className="truncate">{selectedRepo || "Select Repository"}</span> <ChevronDown className="text-gray-400"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] lg:w-[340px] p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700">
                <div className="p-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            placeholder="Search repositories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-8 flex-1 bg-transparent text-black dark:text-white border-gray-300 dark:border-neutral-700 focus-visible:ring-0"
                        />
                    </div>
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-1 text-black dark:text-white">
                            {filteredRepos.map((repo) => (
                                <Button
                                    key={repo.id}
                                    variant="ghost"
                                    className="w-full justify-start font-normal"
                                    onClick={() => handleSelectRepo(repo.full_name, repo.name)}
                                >
                                    {repo.name}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                    {selectedRepo && (
                        <Button 
                            className='w-full text-red-500 bg-gray-100 dark:bg-gray-800 text-xs'
                            onClick={handleClearRepo}
                        >
                            <CircleX/>Clear selected repository
                        </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SelectRepos;