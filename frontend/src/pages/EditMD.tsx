import {useState, useEffect} from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { CircleXIcon, DownloadIcon } from 'lucide-react';
import TemplateSelector from '@/components/edit/TemplateSelector';
import { Button } from '@/components/ui/button';
import SelectRepos from '@/components/edit/SelectRepos';
import SelectFeature from '@/components/edit/SelectFeature';
import { useGithubStore } from "@/store/github.store";
import { toast } from 'sonner';

function Edit() {
  const { theme } = useTheme();
  const [markdown, setMarkdown] = useState("")
  const [selectedFeature, setSelectedFeature] = useState("")
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [repoName, setRepoName] = useState("");

  const handleDownload = () => {

    if (markdown === ""){
      toast.error('Your README is empty.');
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
  }

  const handleClearFeature = () => {
    setSelectedFeature("")
    setMarkdown("")
    setSelectedRepo("")
    setRepoName("")
    useGithubStore.setState({ readme: "" })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <div className='p-4 max-w-[80%] mx-auto'>
      <div className='flex flex-row justify-between'>
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Markdown Editor</h1>
        <div className='flex flex-row gap-4'>

          {!selectedFeature ? (
            <div className='flex flex-row gap-x-3'>
              <SelectFeature setSelectedFeature={setSelectedFeature} selectedFeature={selectedFeature} />
            </div>
          ) :(
            <Button className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'
              onClick={handleClearFeature}
            >
              <CircleXIcon/>
            </Button>
          )}

          {selectedFeature === "repos" && 
            <SelectRepos 
              selectedRepo={selectedRepo}
              setSelectedRepo={setSelectedRepo}
              repoName={repoName}
              setRepoName={setRepoName}
              setMarkdown={setMarkdown}
            />
          }

          {selectedFeature === "templates" && 
            <TemplateSelector setMarkdown={setMarkdown} /> 
          }

          <Button 
            className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' 
            onClick={handleDownload}
          >
            <DownloadIcon/>Download
          </Button>

        </div>
      </div>
      <MarkdownEditor
        value={markdown}
        height="80dvh"
        className='min-w-[100%] mx-auto prose prose-sm md:prose-base dark:prose-invert'
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
  )
}

export default Edit;