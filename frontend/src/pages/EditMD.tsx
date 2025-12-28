import {useState, useEffect, useMemo} from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { CircleXIcon, DownloadIcon, GithubIcon, Loader2 } from 'lucide-react';
import TemplateSelector from '@/components/edit/TemplateSelector';
import { Button } from '@/components/ui/button';
import SelectRepos from '@/components/edit/RepoSelector';
import SelectFeature from '@/components/edit/SelectFeature';
import { useGithubStore } from "@/store/github.store";
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileScreen from '@/components/custom/MobileScreen';
import { getGithubToken } from '@/utils/github-token';
import { toBase64 } from '@/utils/base64';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

function Edit() {
  const { theme } = useTheme();
  const [markdown, setMarkdown] = useState("")
  const [isCommit, setIsCommit] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("")
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [initialReadme, setInitialReadme] = useState("");
  const isMobile = useIsMobile();
  const { 
    sha, 
    postCommit, 
    fetchSHA, 
    selectedBranch, 
    repoFullName 
  } = useGithubStore();
  const githubToken = getGithubToken();
  const [commit, setCommit] = useState({
    full_name: "",
    sha: "",
    content: "",
    message: "",
    description: "",
    branch: ""
  });

  const handleDownload = () => {
    if (markdown === ""){
      toast.error('Your README is empty.');
      return;
    };

    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
  }

  const handleCommit = async () => {
    if (initialReadme === markdown) {
      toast.error('Make changes first to commit.');
      return;
    }
    
    setIsCommit(true);
    const { success, message } = await postCommit(commit);

    try {
      if (success) {
        setCommit({
          full_name: "",
          sha: "",
          content: "",
          message: "",
          description: "",
          branch: ""
        });
        toast.success(message);
        fetchSHA(repoFullName, selectedBranch);
        setInitialReadme(markdown);
      } else {
        throw Error(message);
      }
      
    } catch (error) {
      toast.error(message);
      setCommit({...commit});
      setIsCommit(false);
    } finally {
      setIsCommit(false);
    }
  }

  const handleClear = () => {
    setSelectedFeature("")
    setInitialReadme("")
    setMarkdown("")
    setSelectedRepo("")
    useGithubStore.setState({ 
      readme: "", 
      sha: "",
      selectedBranch: "",
      repoFullName: "",
    })
    setCommit({
      full_name: "",
      sha: "",
      content: "",
      message: "",
      description: "",
      branch: ""
    })
  };

  useEffect(() => {
    if (selectedRepo && selectedBranch) {
      const base64Markdown = toBase64(markdown);
      setCommit({
        full_name: repoFullName,
        sha: sha || "",
        content: base64Markdown,
        message: "",
        description: "",
        branch: selectedBranch
      })
    };
  },[selectedRepo, selectedBranch, markdown, sha]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  const isCommitDisabled = useMemo(() => {
    return isCommit 
      || !selectedBranch 
      || !githubToken 
      || !selectedRepo;
  }, [isCommit, selectedBranch, githubToken, selectedRepo]);

  return (
    <>
      {!isMobile? (
        <div className='p-4 max-w-[90%] mx-auto'>
          <div className='flex flex-row justify-between'>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-black dark:text-white">Markdown Editor</h1>
            <div className='flex flex-row gap-4 items-center'>

              {!selectedFeature ? (
                <div className='flex flex-row gap-x-3'>
                  <SelectFeature setSelectedFeature={setSelectedFeature} selectedFeature={selectedFeature} />
                </div>
              ):(
                <Button className='h-[36px] text-red-500 -mr-4'
                  onClick={handleClear}
                  variant={'ghost'}
                >
                  <CircleXIcon/>
                </Button>
              )}

              {selectedFeature === "repos" && 
                <SelectRepos 
                  selectedRepo={selectedRepo}
                  setSelectedRepo={setSelectedRepo}
                  setInitialReadme={setInitialReadme}
                  setMarkdown={setMarkdown}
                />
              }

              {selectedFeature === "templates" && 
                <TemplateSelector setMarkdown={setMarkdown} /> 
              }

              {selectedFeature === "templates" &&
                <Button 
                  className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' 
                  onClick={handleDownload}
                >
                  <DownloadIcon/>Download
                </Button>  
              }

              {selectedFeature === "repos" &&
                <>
                  <AlertDialog>
                    {!isCommitDisabled ? (
                      <AlertDialogTrigger>
                        <Button 
                          className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' 
                          disabled={isCommitDisabled}
                        >
                          <GithubIcon/>Commit
                        </Button>
                      </AlertDialogTrigger>                      
                    ):(
                      <Button 
                        className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' 
                        disabled={isCommitDisabled}
                      >
                        {!isCommit ? (
                          <><GithubIcon/>Commit</>
                        ):(
                          <><Loader2 className='animate-spin'/> Committing...</>
                        )}
                      </Button>
                    )}
                    <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-black dark:text-white flex justify-between">
                          Commit Changes
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Separator className='bg-gray-300 dark:bg-neutral-700 -mt-2'/>
                      <AlertDialogDescription className="text-black dark:text-white space-y-4">
                        <div className='space-y-3'>
                          <Label>
                            Commit Message
                          </Label>
                          <Input
                            type="text" 
                            placeholder="docs: update README.md"
                            onChange={(e) => {
                              setCommit({
                                ...commit,
                                message: e.target.value,
                              })
                            }}
                            className='border-gray-300 dark:border-neutral-700'
                          />                          
                        </div>
                        <div className='space-y-3'>
                          <Label>
                            Extended Description
                          </Label>
                          <Textarea
                            placeholder="Description..."
                            onChange={(e) => {
                              setCommit({
                                ...commit,
                                description: e.target.value,
                              })
                            }}
                            className='border-gray-300 dark:border-neutral-700'
                          />                          
                        </div>
                      </AlertDialogDescription>
                      <AlertDialogFooter className="w-full flex justify-between">
                        <AlertDialogCancel
                          className="text-black dark:text-white border-gray-300 dark:border-neutral-700"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-green-500 text-white border border-gray-400"
                          onClick={handleCommit}
                        >
                          Commit
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>	               
                </>
              }
            </div>
          </div>
          <MarkdownEditor
            value={markdown}
            height="calc(100vh - 180px)"
            className='min-w-[100%] mx-auto prose-sm md:prose-base prose-invert'
            onChange={(value) => setMarkdown(value)}
            visible={true}
            toolbars={[
              'undo',
              'redo',
              'bold',
              'italic',
              'header',
              'quote',
              'olist',
              'ulist',
              'link',
            ]}
          />
        </div>
      ): (
        <MobileScreen />
      )}
    </>
  )
};

export default Edit;