import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { markdown } from '@/utils/markdown';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Home() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
    
  return (
    <div className="min-h-[95dvh] bg-gray-100 dark:bg-neutral-950 py-8">
      <div className='mt-[6rem] max-w-[240px] mx-auto text-center bg-gray-200 dark:bg-neutral-700 py-1 px-2 rounded-full text-sm text-black dark:text-gray-300 border border-gray-400 dark:border-neutral-500'>
        Markdown Editing for Everyone
      </div>
      <h1 className="pt-6 text-center max-w-4xl mx-auto text-6xl md:text-7xl xl:text-[5.25rem] text-black dark:text-white">
        Modern Solutions for Writing Documentation
      </h1>
      <p className="mx-auto text-center mt-8 max-w-2xl text-balance text-lg text-black dark:text-white">
        Write beautiful documentation and README files with this markdown editor. Create your templates, use them, and avoid rewriting repetitively.
      </p>
      <div className='flex flex-row justify-center py-10 gap-x-4'>
        <Button className='text-white dark:text-black bg-black dark:bg-white'>
          <SignInButton mode="modal" />
        </Button>
        <Link to={'https://github.com/jei3m'} target='_blank'>
          <Button className='text-black dark:text-white'>View Repository</Button>
        </Link>
      </div>
      <div className='mx-auto rounded-2xl p-4 max-w-7xl bg-gray-300 dark:bg-neutral-800'>
        <MarkdownEditor
          value={markdown}
          height="80dvh"
          className='min-w-full mx-auto prose prose-sm md:prose-base dark:prose-invert'
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

export default Home