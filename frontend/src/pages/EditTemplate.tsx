import {useState, useEffect} from 'react';
import { UserAuth } from '@/contexts/FirebaseContext';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from '../contexts/ThemeProvider';
import { Loader2, SaveIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTemplateStore } from '@/store/template.store';
import { toast } from 'sonner';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileScreen from '@/components/custom/MobileScreen';

function EditTemplate() {
    const { theme } = useTheme();
    const {currentUser} = UserAuth();
    const userId = currentUser.providerData[0].uid;
    const { fetchTemplateById, updateTemplate } = useTemplateStore();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isUpdating, setIsUpdating] = useState(false);
    const isMobile = useIsMobile();

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

        setIsUpdating(true);

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
            setIsUpdating(false);
            navigate('/home');
        } else {
            toast.error(message);
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
    }, [theme]);

    return (
        <>
        {!isMobile? (
            <div className='p-4 max-w-[80%] mx-auto'>
                <div className='flex flex-row justify-between'>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-black dark:text-white">Edit Template</h1>
                    <Input 
                        type='text' 
                        value={template.title} 
                        onChange={(e) => setTemplate({...template, title: e.target.value})} 
                        placeholder='Template Title' 
                        className='h-[36px] w-[160px] lg:w-[200px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'
                        required
                    />
                    <div className='flex flex-row gap-4'>
    
                        <Button type="button" asChild={!isUpdating} disabled={isUpdating} className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'>
                            <Link to="/home" className='flex items-center gap-x-2'>
                                <X/>Cancel
                            </Link>
                        </Button>
    
                        {isUpdating ? (
                            <Button disabled={isUpdating} className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'>
                                <Loader2 className='animate-spin'/>Updating...
                            </Button>
                        ):(
                            <Button disabled={isUpdating} onClick={handleUpdateTemplate} className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white'>
                                <SaveIcon/>Update
                            </Button>
                        )}
                    </div>
                </div>
                <MarkdownEditor
                    value={template.content}
                    height="78dvh"
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
        ): (
            <MobileScreen />
        )}
        </>

    )
}

export default EditTemplate;