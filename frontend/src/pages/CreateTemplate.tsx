import {useState, useEffect} from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { SaveIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@clerk/clerk-react';
import { useTemplateStore } from '@/store/template.store';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

function CreateTemplate() {
    const { theme } = useTheme();
    const { userId } = useAuth();
    const { createTemplate } = useTemplateStore();
    const navigate = useNavigate();

    const [newTemplate, setNewTemplate] = useState({
        userId: userId,
        title: "",
        content: "",
    });

    const handleSaveTemplate = async () => {
        
        const { success, message } = await createTemplate({
            userId: userId as string,
            title: newTemplate.title,
            content: newTemplate.content
        });

        switch (true) {
            case !newTemplate.title:
                toast.error('Please enter a template title');
                return;
            case newTemplate.title.length > 18:
                toast.error('Title can only be a maximum of 18 characters');
                return;
            case !newTemplate.content:
                toast.error('Your template content is empty.');
                return;
        }

        if (success) {
            toast.success(message);
            navigate('/home');
            setNewTemplate({
                userId: userId,
                title: "",
                content: "",
            });
        } else {
            toast.error(message);
            setNewTemplate({...newTemplate});
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
    }, [theme]);

    return (
        <div className='min-h-[95dvh] w-full bg-gray-100 dark:bg-neutral-900'>
            <div className='p-4 max-w-[80%] mx-auto'>
                <div className='flex flex-row justify-between'>
                    <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Create Template</h1>
                    <Input 
                        type='text' 
                        value={newTemplate.title} 
                        onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})} 
                        placeholder='Template Title' 
                        className='h-[36px] w-[200px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'
                        required
                    />
                    <div className='flex flex-row gap-4'>
                        <Link to="/home">
                            <Button type="button" className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'>
                                <X/>Cancel
                            </Button>
                        </Link>
                        <Button onClick={handleSaveTemplate} className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'>
                            <SaveIcon/>Save
                        </Button>
                    </div>
                </div>
                <MarkdownEditor
                    value={newTemplate.content}
                    height="80dvh"
                    className='min-w-[100%] mx-auto prose prose-sm md:prose-base dark:prose-invert'
                    onChange={(value) => setNewTemplate({...newTemplate, content: value})}
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

export default CreateTemplate;