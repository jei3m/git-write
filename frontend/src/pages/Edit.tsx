import {useState, useEffect} from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { PlusIcon, SaveIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

function Edit() {
  const { theme } = useTheme();
  const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;
  const [markdown, setMarkdown] = useState(mdStr)

  const templates = ["Template1", "Template2", "Template3", "Template4", "Template5", "Template6", "Template7", "Template8", "Template9", "Template10"]
  
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <div className='min-h-[95dvh] min-w-[100%] bg-gray-100 dark:bg-neutral-900'>
      <div className='p-4 max-w-[80%] mx-auto'>
        <div className='flex flex-row justify-between'>
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Markdown Editor</h1>
          <div className='flex flex-row gap-4'>
            <Select>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent className='bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700'>
                <SelectGroup className='text-black dark:text-white'>
                  {templates.map((template, index) => (
                    <SelectItem key={index} value={index.toString()}>{template}</SelectItem>
                  ))}
                  <Button className='mx-2 mb-2 bg-gray-100 dark:bg-gray-800'><PlusIcon/>Create a new template</Button>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'><SaveIcon/>Save</Button>
          </div>
        </div>
        <MarkdownEditor
          value={markdown}
          height="80dvh"
          className='mx-auto'
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
            'code',
            'link',
          ]}
        />
      </div>
    </div>
  )
}

export default Edit;