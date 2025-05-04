import {useState, useEffect} from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { SaveIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@clerk/clerk-react';
import { useTemplateStore } from '@/store/template.store';
import { toast } from 'sonner';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditTemplate() {
    const { theme } = useTheme();
    const { userId } = useAuth();
    const { fetchTemplateById, updateTemplate } = useTemplateStore();
    const navigate = useNavigate();
    const { id } = useParams();

    const [template, setTemplate] = useState({
        userId: userId,
        title: "",
        content: "",
    });

    useEffect(() => {
        const getTemplate = async () => {
            if (id) {
                const response = await fetchTemplateById(id);
                if (response.success && response.data) {
                    setTemplate({
                        userId: response.data.userId,
                        title: response.data.title,
                        content: response.data.content
                    });
                } else {
                    toast.error(response.message)
                }
            }
        };
        
        getTemplate();
    }, [id, fetchTemplateById]);

    const handleUpdateTemplate = async () => {

        switch (true) {
            case !template.title:
                toast.error('Please enter a template title');
                return;
            case template.title.length > 18:
                toast.error('Title can only be a maximum of 18 characters');
                return;
            case !template.content:
                toast.error('Your template content is empty.');
                return;
            case !id:
                toast.error('Template ID is missing');
                return;
        }

        const { success, message } = await updateTemplate(id, {
            userId: userId as string,
            title: template.title,
            content: template.content
        });

        if (success) {
            toast.success(message);
            navigate('/home');
        } else {
            toast.error(message);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
    }, [theme]);

    return (
        <div className='min-h-[95dvh] w-full bg-gray-100 dark:bg-neutral-900'>
            <div className='p-4 max-w-[80%] mx-auto'>
                <div className='flex flex-row justify-between'>
                    <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Edit Template</h1>
                    <Input 
                        type='text' 
                        value={template.title} 
                        onChange={(e) => setTemplate({...template, title: e.target.value})} 
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
                        <Button onClick={handleUpdateTemplate} className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'>
                            <SaveIcon/>Update
                        </Button>
                    </div>
                </div>
                <MarkdownEditor
                    value={template.content}
                    height="80dvh"
                    className='min-w-[100%] mx-auto prose prose-sm md:prose-base dark:prose-invert'
                    onChange={(value) => setTemplate({...template, content: value})}
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

export default EditTemplate;