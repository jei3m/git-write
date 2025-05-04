import {useState, useEffect} from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { DownloadIcon } from 'lucide-react';
import TemplateSelector from '@/components/custom/edit/TemplateSelector';
import { Button } from '@/components/ui/button';

function Edit() {
  const { theme } = useTheme();
  const [markdown, setMarkdown] = useState("")

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <div className='min-h-[95dvh] w-full bg-gray-100 dark:bg-neutral-900'>
      <div className='p-4 max-w-[80%] mx-auto'>
        <div className='flex flex-row justify-between'>
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Markdown Editor</h1>
          <div className='flex flex-row gap-4'>
            <TemplateSelector setMarkdown={setMarkdown} />
            <Button className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' onClick={handleDownload}><DownloadIcon/>Download</Button>
            {/* <Button className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'><Github/>Publish</Button> */}
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
    </div>
  )
}

export default Edit;