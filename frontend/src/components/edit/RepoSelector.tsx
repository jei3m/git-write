import { useEffect, useState } from "react";
import { useGithubStore } from "@/store/github.store";
import { Button } from "@/components/ui/button";
import { ChevronDown, CircleX, Search, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SelectRepoProps } from "@/types/component.types";
import TemplateSelector from "./TemplateSelector";
import { toast } from "sonner";

function SelectRepos({
  selectedRepo,
  setSelectedRepo,
  setInitialReadme,
  setMarkdown,
}: SelectRepoProps) {
  const {
    repos,
    fetchRepos,
    readme,
    fetchReadme,
    gitUser,
    fetchBranches,
    branches,
		selectedBranch,
		fetchSHA,
		repoFullName,
  } = useGithubStore();
  const [repoSelectOpen, setRepoSelectOpen] = useState(false);
  const [branchSelectOpen, setBranchSelectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchSearchQuery, setBranchSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isNoReadMeDialogOpen, setIsNoReadMeDialogOpen] = useState(false);

  const githubUsername = gitUser?.login;

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

	const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(branchSearchQuery.toLowerCase())
  );

  const handleSelectRepo = async (repoName: string, repoTitle: string) => {
    setIsFetching(true);
    try {
      setSelectedRepo(repoTitle);
      setRepoSelectOpen(false);
      useGithubStore.setState({
        repoFullName: repoName
			});
    	fetchBranches(repoName);
    } catch (error: unknown) {
      if (error instanceof Error) console.error(`Error: ${error.message}`);
      console.error("An unknown error has occured");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSelectBranch = async (branchName: string) => {
		try {
			if (!repoFullName) {
				toast.error("There is no selected repository");
				return;
			};
			fetchSHA(repoFullName, branchName);
			useGithubStore.setState({
				selectedBranch: branchName,
			});
      setBranchSelectOpen(false);
			fetchReadme(repoFullName!, branchName)
		} catch (error) {
      if (error instanceof Error) console.error(`Error: ${error.message}`);
      console.error("An unknown error has occured");
		}
  };

  const handleClearRepo = () => {
    setInitialReadme("");
    setMarkdown("");
    setSelectedRepo("");
    useGithubStore.setState({ 
			readme: "", 
			sha: "", 
			branches: [],
			repoFullName: "",
		});
  };

  const handleClearBranch = () => {
    setInitialReadme("");
    setMarkdown("");
    useGithubStore.setState({ 
			readme: "", 
			sha: "", 
			selectedBranch: "",
		});
  };

  useEffect(() => {
    if (githubUsername) {
      fetchRepos(githubUsername);
    }
  }, [githubUsername, fetchRepos]);

  useEffect(() => {
    if (selectedRepo && selectedBranch) {
      setMarkdown(readme);
      setInitialReadme(readme);
      if (!readme && !isFetching) {
        setIsNoReadMeDialogOpen(true);
      }
    }
  }, [readme, selectedRepo, isFetching]);

  return (
    <div className="flex space-x-4">
			{/* Repositories Selector */}
			<div>
				<Popover open={repoSelectOpen} onOpenChange={setRepoSelectOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="min-w-[140px] justify-between bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white"
						>
							<span className="truncate">
								{selectedRepo || "Select Repository"}
							</span>{" "}
							<ChevronDown className="text-gray-400" />
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
									className="w-full text-red-500 bg-gray-100 dark:bg-gray-800 text-xs"
									onClick={handleClearRepo}
								>
									<CircleX />
									Clear selected repository
								</Button>
							)}
						</div>
					</PopoverContent>
				</Popover>
				<AlertDialog open={isNoReadMeDialogOpen}>
					<AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-black dark:text-white flex justify-between">
								No README Content
							</AlertDialogTitle>
							<AlertDialogDescription className="text-black dark:text-white">
								It looks like this repository doesn't have a README. To start with
								a template just select from the dropdown below.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="w-full flex justify-between">
							<AlertDialogCancel
								className="text-black dark:text-white border-gray-300 dark:border-neutral-700"
								onClick={() => setIsNoReadMeDialogOpen(false)}
							>
								Close <XIcon />
							</AlertDialogCancel>
							<TemplateSelector setMarkdown={setMarkdown} />
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>				
			</div>
			{/* Branch Selector */}
			{selectedRepo && (
				<div>
					<Popover open={branchSelectOpen} onOpenChange={setBranchSelectOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="min-w-[140px] justify-between bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white"
							>
								<span className="truncate">
									{ selectedBranch || "Select Branch"}
								</span>{" "}
								<ChevronDown className="text-gray-400" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="min-w-[140px] p-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700">
							<div className="p-2">
								<div className="flex items-center space-x-2 mb-2">
									<Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
									<Input
										placeholder="Search branches..."
										value={branchSearchQuery}
										onChange={(e) => setBranchSearchQuery(e.target.value)}
										className="h-8 flex-1 bg-transparent text-black dark:text-white border-gray-300 dark:border-neutral-700 focus-visible:ring-0"
									/>
								</div>
								<ScrollArea className="min-h-[40px]">
									<div className="space-y-1 text-black dark:text-white">
										{filteredBranches.map((branch, index) => (
											<Button
												key={index}
												variant="ghost"
												className="w-full justify-start font-normal"
												onClick={() => handleSelectBranch(
													branch.name,
												)}
											>
												{branch.name}
											</Button>
										))}
									</div>
								</ScrollArea>
								{selectedBranch && (
									<Button
										className="w-full text-red-500 bg-gray-100 dark:bg-gray-800 text-xs"
										onClick={handleClearBranch}
									>
										<CircleX />
										Clear selected branch
									</Button>
								)}
							</div>
						</PopoverContent>
					</Popover>
				</div>				
			)}
    </div>
  );
};

export default SelectRepos;
